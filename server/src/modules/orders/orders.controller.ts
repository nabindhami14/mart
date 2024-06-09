import { Request, Response } from "express";
import prisma from "../../config/db";

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { totalAmount, status, userId, orderItems, payments, shippings } =
            req.body;

        const order = await prisma.order.create({
            data: {
                totalAmount,
                status,
                user: { connect: { id: userId } },
                orderItems: {
                    create: orderItems,
                },
                payments: {
                    create: payments,
                },
                shippings: {
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
            include: { orderItems: true, payments: true, shippings: true },
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
            include: { orderItems: true, payments: true, shippings: true },
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
        const { totalAmount, status, userId, orderItems, payments, shippings } =
            req.body;

        const order = await prisma.order.update({
            where: { id: parseInt(id) },
            data: {
                totalAmount,
                status,
                user: { connect: { id: userId } },
                orderItems: {
                    update: orderItems,
                },
                payments: {
                    update: payments,
                },
                shippings: {
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
