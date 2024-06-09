import express from "express";
import {
    createUser,
    getCustomers,
    getOrders,
    loginUser,
} from "./customer.controller";

const customerRouter = express.Router();

// routes
customerRouter.post("/register", createUser);
customerRouter.post("/login", loginUser);

customerRouter.post("/", getCustomers);

// ORDERS
customerRouter.get("/orders", getOrders);

export default customerRouter;
