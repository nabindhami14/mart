import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

import prisma from "../../config/db";

const createCategoery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, vendor, billboard } = req.body;
    if (!name) {
        const error = createHttpError(400, "All fields are required");
        return next(error);
    }

    try {
        const category = await prisma.category.findFirst({ where: { name } });
        if (category) {
            return next(
                createHttpError(400, "Category already exists with this name.")
            );
        }

        await prisma.category.create({
            data: { name, vendor, billboard },
        });

        res.status(201).json({});
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
        const categories = await prisma.category.findMany();
        res.json({ categories });
    } catch (err) {
        return next(createHttpError(500, "Internal server error"));
    }
};
const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await prisma.category.findMany({
            where: {
                id: req.params.categoryId,
            },
            select: {
                products: true,
            },
        });
        res.json({ products });
    } catch (err) {
        return next(createHttpError(500, "Internal server error"));
    }
};

export { createCategoery, getCategories, getProducts };
