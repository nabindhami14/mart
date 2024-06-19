import express from "express";
import {
    getCustomers,
    getOrders,
    loginCustomer,
    registerCustomer,
} from "./customer.controller";

const customerRouter = express.Router();

// routes
customerRouter.post("/auth/register", registerCustomer);
customerRouter.post("/auth/login", loginCustomer);

customerRouter.post("/", getCustomers);

// ORDERS
customerRouter.get("/orders", getOrders);

export default customerRouter;
