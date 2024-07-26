import express from "express";

import { getAllVendors, getOverview, verifyVendor } from "./admin.controller";

const adminRouter = express.Router();

adminRouter.get("/overview", getOverview);
adminRouter.get("/vendors", getAllVendors);
adminRouter.patch("/vendors/verify/:vendorId", verifyVendor);

export default adminRouter;
