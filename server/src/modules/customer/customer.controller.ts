import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

import config from "../../config";
import prisma from "../../config/db";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        const error = createHttpError(400, "All fields are required");
        return next(error);
    }

    try {
        const user = await prisma.user.findFirst({ where: { email } });
        if (user) {
            return next(
                createHttpError(400, "User already exists with this email.")
            );
        }

        const hash = await bcrypt.hash(password, 10);
        await prisma.user.create({
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

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(createHttpError(400, "All fields are required"));
    }

    try {
        const user = await prisma.user.findFirst({ where: { email } });
        if (!user) {
            return next(createHttpError(404, "User not found."));
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(
                createHttpError(400, "Username or password incorrect!")
            );
        }

        const accessToken = jwt.sign(
            { sub: user.id },
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
        const customers = await prisma.user.findMany({
            where: { role: "CUSTOMER" },
        });

        return res.json(customers);
    } catch (err) {
        return next(createHttpError(500, "Internal server error"));
    }
};

export { createUser, getCustomers, loginUser };
