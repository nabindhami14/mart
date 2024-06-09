import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

import prisma from "../../config/db";

const createVendors = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, description, userId } = req.body;
    // GET THE USER ID FROM THE MIDDLEWARE

    try {
        const vendor = await prisma.vendor.findFirst({ where: { name } });
        if (vendor) {
            return next(
                createHttpError(400, "Vendor already exists with this name.")
            );
        }

        await prisma.vendor.create({
            data: {
                name,
                description,
                userId,
            },
        });

        res.status(201).json({});
    } catch (err) {
        return next(createHttpError(500, "Internal server error"));
    }
};

const getVendors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vendors = await prisma.vendor.findMany({});
        res.json(vendors);
    } catch (err) {
        return next(createHttpError(500, "Internal server error"));
    }
};

const getVendor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vendors = await prisma.vendor.findFirst({
            where: {
                id: +req.params.vendorId,
            },
        });
        res.json(vendors);
    } catch (err) {
        return next(createHttpError(500, "Internal server error"));
    }
};

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await prisma.vendor.findFirst({
            where: {
                id: +req.params.vendorId,
            },
            select: {
                products: true,
            },
        });
        res.json(products?.products);
    } catch (err) {
        return next(createHttpError(500, "Internal server error"));
    }
};
const getCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const vendors = await prisma.vendor.findFirst({
            where: {
                id: +req.params.vendorId,
            },
            select: {
                categories: true,
            },
        });
        res.json(vendors?.categories);
    } catch (err) {
        return next(createHttpError(500, "Internal server error"));
    }
};

export { createVendors, getCategories, getProducts, getVendor, getVendors };
