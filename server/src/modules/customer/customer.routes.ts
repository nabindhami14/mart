import express from "express";
import { createUser, loginUser } from "./customer.controller";

const customerRouter = express.Router();

// routes
customerRouter.post("/register", createUser);
customerRouter.post("/login", loginUser);

export default customerRouter;
