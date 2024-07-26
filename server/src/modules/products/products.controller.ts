import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

import prisma from "../../config/db";

const createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, description, price, stock, categoryId, vendorId } = req.body;

    // @ts-ignore
    const images = req.files && req.files.map((file) => file.filename);

    try {
        const product = await prisma.product.findFirst({ where: { name } });
        if (product) {
            return next(
                createHttpError(400, "Product already exists with this name.")
            );
        }

        await prisma.product.create({
            data: {
                name,
                description,
                stock: parseInt(stock),
                price: parseFloat(price),
                categoryId: +categoryId,
                vendorId: +vendorId,
                images: JSON.stringify(images),
            },
        });

        res.status(201).json({});
    } catch (err) {
        console.log(err);
        return next(createHttpError(500, "Internal server error"));
    }
};

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                stock: true,
                isArchived: true,
                createdAt: true,
                images: true,
            },
        });
        res.json(products);
    } catch (err) {
        return next(createHttpError(500, "Internal server error"));
    }
};
const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await prisma.product.findFirst({
            where: { id: +req.params.productId },
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                stock: true,
                isArchived: true,
                createdAt: true,
                images: true,
            },
        });
        res.json(product);
    } catch (err) {
        return next(createHttpError(500, "Internal server error"));
    }
};

export { createProduct, getProduct, getProducts };
