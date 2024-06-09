import express from "express";

import {
    createOrder,
    deleteOrder,
    getOrderById,
    getOrders,
    updateOrder,
} from "./orders.controller";

const orderRouter = express.Router();

orderRouter.post("/", createOrder);
orderRouter.get("/", getOrders);

orderRouter.get("/:id", getOrderById);
orderRouter.put("/:id", updateOrder);
orderRouter.delete("/:id", deleteOrder);

export default orderRouter;
