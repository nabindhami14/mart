import express from "express";

import {
    getAllVendors,
    getOverview,
    loginAdmin,
    verifyVendor,
} from "./admin.controller";

const adminRouter = express.Router();

adminRouter.post("/auth/login", loginAdmin);
adminRouter.get("/overview", getOverview);
adminRouter.get("/vendors", getAllVendors);
adminRouter.patch("/vendors/verify/:vendorId", verifyVendor);

export default adminRouter;
