import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

import prisma from "../../config/db";

const createBillboard = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { label, imageUrl, billboard } = req.body;

    try {
        const billboard = await prisma.billboard.findFirst({
            where: { label },
        });

        if (billboard) {
            return next(
                createHttpError(400, "Billboard already exists with this name.")
            );
        }

        await prisma.billboard.create({
            data: { label, imageUrl },
        });

        res.status(201).json({});
    } catch (err) {
        return next(createHttpError(500, "Internal server error"));
    }
};

const getBillboard = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const billboard = await prisma.billboard.findFirst({
            where: {
                vendorId: +req.params.vendorId,
            },
        });
        res.json({ billboard });
    } catch (err) {
        return next(createHttpError(500, "Internal server error"));
    }
};

export { createBillboard, getBillboard };
