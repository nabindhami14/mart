import { Request, Response } from "express";
import prisma from "../../config/db";

export const createOrder = async (req: Request, res: Response) => {
    try {
        const {
            totalAmount,
            status,
            customerId,
            orderItems,
            payments,
            shippings,
        } = req.body;

        const order = await prisma.order.create({
            data: {
                totalAmount,
                status,
                customer: { connect: { id: customerId } },
                orderItems: {
                    create: orderItems,
                },
                payment: {
                    create: payments,
                },
                shipping: {
                    create: shippings,
                },
            },
        });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: "Failed to create order" });
    }
};

export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany({
            select: {
                id: true,
                status: true,
                totalAmount: true,
                createdAt: true,
                orderItems: {
                    select: {
                        product: {
                            select: {
                                name: true,
                            },
                        },
                        quantity: true,
                        price: true,
                    },
                },
                payment: {
                    select: {
                        method: true,
                    },
                },
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
        const {
            totalAmount,
            status,
            customerId,
            orderItems,
            payments,
            shippings,
        } = req.body;

        const order = await prisma.order.update({
            where: { id: parseInt(id) },
            data: {
                totalAmount,
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
