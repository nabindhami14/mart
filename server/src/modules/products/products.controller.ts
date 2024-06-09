import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

import prisma from "../../config/db";

const createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, description, images, price, stock, categoryId, vendorId } =
        req.body;

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
                stock,
                images,
                price: parseFloat(price),
                categoryId,
                vendorId,
            },
        });

        res.status(201).json({});
    } catch (err) {
        return next(createHttpError(500, "Internal server error"));
    }
};

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await prisma.product.findFirst({
            where: { id: +req.params.productId },
        });
        res.json(product);
    } catch (err) {
        return next(createHttpError(500, "Internal server error"));
    }
};

export { createProduct, getProduct };
