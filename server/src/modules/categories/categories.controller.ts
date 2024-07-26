import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

import prisma from "../../config/db";

const createCategoery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, vendorId } = req.body;
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
            data: { name, vendorId: parseInt(vendorId) },
        });

        res.status(201).json({});
    } catch (err) {
        return next(createHttpError(500, "Internal server error"));
    }
};

const addBillboard = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { title, description, uri } = req.body;
    try {
        await prisma.billboard.create({
            data: {
                title,
                description,
                image: { create: { uri } },
                category: {
                    connect: {
                        id: +req.params.categoryId,
                    },
                },
            },
        });
        res.json({});
    } catch (err) {
        console.log(err);
        return next(createHttpError(500, "Internal server error"));
    }
};

const getCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                vendor: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        res.json(categories);
    } catch (err) {
        return next(createHttpError(500, "Internal server error"));
    }
};

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await prisma.category.findFirst({
            where: {
                id: +req.params.categoryId,
            },
            include: {
                products: true,
                billboard: {
                    include: {
                        image: true,
                    },
                },
            },
        });
        res.json(category);
    } catch (err) {
        return next(createHttpError(500, "Internal server error"));
    }
};

export { addBillboard, createCategoery, getCategories, getCategory };
