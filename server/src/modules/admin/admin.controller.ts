import { Request, Response } from "express";

import prisma from "../../config/db";

export const getOverview = async (req: Request, res: Response) => {
    try {
        const usersCount = await prisma.customer.count({});
        const vendorsCount = await prisma.vendor.count();
        const ordersCount = await prisma.order.count();

        res.status(201).send({ usersCount, vendorsCount, ordersCount });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete order" });
    }
};

export const getAllVendors = async (req: Request, res: Response) => {
    try {
        const vendors = await prisma.vendor.findMany();
        res.status(200).send(vendors);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete order" });
    }
};
