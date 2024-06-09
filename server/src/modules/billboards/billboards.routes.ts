import express from "express";
import { createBillboard, getBillboard } from "./billboards.controller";

const billboardRouter = express.Router();

// routes
billboardRouter.post("/", createBillboard);
billboardRouter.get("/:vendorId", getBillboard);

export default billboardRouter;
