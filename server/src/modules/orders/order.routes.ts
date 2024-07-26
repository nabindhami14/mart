import express from "express";

import {
    createOrder,
    deleteOrder,
    getOrderById,
    getOrders,
    updateOrder,
    updatePayment,
} from "./orders.controller";
import authenticate from "../../middlewares/authenticate";

const orderRouter = express.Router();

orderRouter.post("/", authenticate, createOrder);
orderRouter.get("/", getOrders);

orderRouter.get("/:id", getOrderById);
orderRouter.put("/:id", updateOrder);
orderRouter.delete("/:id", deleteOrder);

orderRouter.patch("/payment", authenticate, updatePayment);

export default orderRouter;
