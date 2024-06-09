import { Request, Response } from "express";

import prisma from "../../config/db";

export const getOverview = async (req: Request, res: Response) => {
    try {
        console.log("first");
        const usersCount = await prisma.user.count({
            where: { role: "CUSTOMER" },
        });
        const vendorsCount = await prisma.vendor.count();
        const ordersCount = await prisma.order.count();

        res.status(201).send({ usersCount, vendorsCount, ordersCount });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete order" });
    }
};
