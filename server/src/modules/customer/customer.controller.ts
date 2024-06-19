import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

import config from "../../config";
import prisma from "../../config/db";

const registerCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        const error = createHttpError(400, "All fields are required");
        return next(error);
    }

    try {
        const customer = await prisma.customer.findFirst({ where: { email } });
        if (customer) {
            return next(
                createHttpError(400, "Customer already exists with this email.")
            );
        }

        const hash = await bcrypt.hash(password, 10);
        await prisma.customer.create({
            data: {
                name,
                email,
                password: hash,
            },
        });

        res.status(201).json({});
    } catch (err) {
        return next(createHttpError(500, "Internal server error"));
    }
};

const loginCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(createHttpError(400, "All fields are required"));
    }

    try {
        const customer = await prisma.customer.findFirst({ where: { email } });
        if (!customer) {
            return next(createHttpError(404, "Customer not found."));
        }

        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            return next(
                createHttpError(400, "Customername or password incorrect!")
            );
        }

        const accessToken = jwt.sign(
            { sub: customer.id },
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

const getCustomers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const customers = await prisma.customer.findMany({});

        return res.json(customers);
    } catch (err) {
        return next(createHttpError(500, "Internal server error"));
    }
};
const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customers = await prisma.order.findMany({
            where: { customerId: 1 },
        });

        return res.json(customers);
    } catch (err) {
        return next(createHttpError(500, "Internal server error"));
    }
};

export { getCustomers, getOrders, loginCustomer, registerCustomer };
