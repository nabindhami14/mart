import express from "express";

import { getAllVendors, getOverview } from "./admin.controller";

const adminRouter = express.Router();

adminRouter.get("/overview", getOverview);
adminRouter.get("/vendors", getAllVendors);

export default adminRouter;
