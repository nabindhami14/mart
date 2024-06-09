import express from "express";
import { createUser, getCustomers, loginUser } from "./customer.controller";

const customerRouter = express.Router();

// routes
customerRouter.post("/register", createUser);
customerRouter.post("/login", loginUser);

customerRouter.post("/", getCustomers);

export default customerRouter;
