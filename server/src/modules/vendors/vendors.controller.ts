import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

import config from "../../config";
import prisma from "../../config/db";

const registerVendor = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, email, password, title, description, phone, location } =
        req.body;
    // GET THE USER ID FROM THE MIDDLEWARE

    try {
        const vendor = await prisma.vendor.findFirst({
            where: { name, email },
        });
        if (vendor) {
            return next(
                createHttpError(400, "Vendor already exists with this name.")
            );
        }

        const hash = await bcrypt.hash(password, 10);
        await prisma.vendor.create({
            data: {
                name,
                email,
                password: hash,
                phone,
                title,
                description,
                location,
            },
        });

        res.status(201).json({});
    } catch (err) {
        console.log(err);
        return next(createHttpError(500, "Internal server error"));
    }
};

const loginVendor = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(createHttpError(400, "All fields are required"));
    }

    try {
        const vendor = await prisma.vendor.findFirst({ where: { email } });
        if (!vendor) {
            return next(createHttpError(404, "Vendor not found."));
        }

        const isMatch = await bcrypt.compare(password, vendor.password);
        if (!isMatch) {
            return next(
                createHttpError(400, "Username or password incorrect!")
            );
        }
        if (!vendor.isVerified) {
            return next(createHttpError(400, "Vendor is not verified yet"));
        }

        const accessToken = jwt.sign(
            { sub: vendor.id },
            config.jwtSecret as string,
            {
                expiresIn: "7d",
                algorithm: "HS256",
            }
        );

        res.json({ accessToken, vendorId: vendor.id });
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
        await prisma.vendor.update({
            where: {
                id: +req.params.vendorId,
            },
            data: {
                billboard: {
                    create: {
                        title,
                        description,
                        image: {
                            create: {
                                uri,
                            },
                        },
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

const getVendors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vendors = await prisma.vendor.findMany({
            where: { isVerified: true },
        });
        res.json(vendors);
    } catch (err) {
        return next(createHttpError(500, "Internal server error"));
    }
};

const getVendor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vendor = await prisma.vendor.findFirst({
            where: {
                id: +req.params.vendorId,
            },
            include: {
                billboard: {
                    select: {
                        title: true,
                        description: true,
                        image: {
                            select: {
                                uri: true,
                            },
                        },
                    },
                },
                categories: true,
            },
        });
        res.json(vendor);
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
const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vendors = await prisma.order.findMany({
            where: {
                vendorId: parseInt(req.params.vendorId),
            },
            include: {
                customer: true,
            },
        });
        res.json(vendors);
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
            include: {
                categories: {
                    select: {
                        id: true,
                        name: true,
                        vendor: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });
        res.json(vendors?.categories);
    } catch (err) {
        return next(createHttpError(500, "Internal server error"));
    }
};

export {
    addBillboard,
    getCategories,
    getOrders,
    getProducts,
    getVendor,
    getVendors,
    loginVendor,
    registerVendor,
};
