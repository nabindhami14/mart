import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

import prisma from "../../config/db";
import config from "../../config";

export const loginAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(createHttpError(400, "All fields are required"));
    }

    try {
        const admin = await prisma.admin.findFirst({ where: { email } });
        if (!admin) {
            return next(createHttpError(404, "admin not found."));
        }

        if (password !== admin.password) {
            return next(
                createHttpError(400, "admin email or password incorrect!")
            );
        }

        const accessToken = jwt.sign(
            { sub: admin.id },
            config.jwtSecret as string,
            {
                expiresIn: "7d",
                algorithm: "HS256",
            }
        );

        res.json({ accessToken });
    } catch (err) {
        return next(createHttpError(500, "Internal server error"));
    }
};
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

export const verifyVendor = async (req: Request, res: Response) => {
    try {
        await prisma.vendor.update({
            where: { id: +req.params.vendorId },
            data: {
                isVerified: true,
            },
        });

        res.status(200).json({});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to verify vendor" });
    }
};
