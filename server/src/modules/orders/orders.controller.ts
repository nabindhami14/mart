import { Request, Response } from "express";

import prisma from "../../config/db";
import { initializeKhaltiPayment } from "../../config/khalti";

interface CustomRequest extends Request {
    userId?: string;
}

export const createOrder = async (req: CustomRequest, res: Response) => {
    const customerId = parseInt(req.userId!);

    if (isNaN(customerId)) {
        return res.status(400).json({ error: "Invalid customer ID" });
    }

    try {
        const { amount, orderItems } = req.body;

        if (
            typeof amount !== "number" ||
            !Array.isArray(orderItems) ||
            orderItems.length === 0
        ) {
            return res.status(400).json({ error: "Invalid input data" });
        }
        const product = await prisma.product.findFirst({
            where: { id: parseInt(orderItems[0].productId) },
        });
        // Create order
        const order = await prisma.order.create({
            data: {
                amount,
                customer: { connect: { id: customerId } },
                vendor: { connect: { id: product?.vendorId } },
                orderItems: {
                    create: orderItems.map(
                        (item: { productId: string; quantity: number }) => ({
                            product: {
                                connect: { id: parseInt(item.productId, 10) },
                            },
                            quantity: item.quantity, // Ensure quantity is a number
                        })
                    ),
                },
            },
        });

        // Initialize Khalti payment
        const data = await initializeKhaltiPayment({
            amount: amount * 100, // Convert to paisa
            purchase_order_id: order.id,
            purchase_order_name: customerId.toString(),
            return_url: `http://localhost:5173/shipping`,
            website_url: `http://localhost:5473`,
        });

        // Create payment record
        const payment = await prisma.payment.create({
            data: {
                amount,
                pidx: data.pidx,
                payment_url: data.payment_url,
                order: { connect: { id: order.id } },
                customer: { connect: { id: customerId } },
            },
        });

        res.status(201).json({
            paymentUrl: data.payment_url,
            paymentId: payment.id,
        });
    } catch (error: any) {
        console.error("Error creating order:", error.message || error);
        res.status(500).json({
            error: "Failed to create order",
            details: error.message || error,
        });
    }
};

export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                customer: true,
                vendor: true,
            },
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const order = await prisma.order.findFirst({
            where: { id: parseInt(id) },
            include: { orderItems: true, payment: true, shipping: true },
        });
        if (!order) return res.status(404).json({ error: "Order not found" });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch order" });
    }
};

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { amount, status, customerId, orderItems, payments, shippings } =
            req.body;

        const order = await prisma.order.update({
            where: { id: parseInt(id) },
            data: {
                amount,
                status,
                customer: { connect: { id: customerId } },
                orderItems: {
                    update: orderItems,
                },
                payment: {
                    update: payments,
                },
                shipping: {
                    update: shippings,
                },
            },
        });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: "Failed to update order" });
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        await prisma.order.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete order" });
    }
};

export const updatePayment = async (req: Request, res: Response) => {
    const { transactionId, orderId } = req.body;

    try {
        await prisma.payment.update({
            where: { orderId: parseInt(orderId) },
            data: {
                status: "SUCCESS",
                transactionId: transactionId,
            },
        });
        await prisma.order.update({
            where: { id: parseInt(orderId) },
            data: {
                status: "SHIPPED",
            },
        });

        return res.status(200).json({});
    } catch (error) {
        return res.status(500).json({ error: "Error while updating payment." });
    }
};
