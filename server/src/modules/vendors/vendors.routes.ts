import express from "express";
import {
    createVendors,
    getCategories,
    getProducts,
    getVendor,
    getVendors,
} from "./vendors.controller";

const vendorRouter = express.Router();

// routes
vendorRouter.post("/", createVendors);
vendorRouter.get("/", getVendors);
vendorRouter.get("/:vendorId", getVendor);

vendorRouter.get("/:vendorId/products", getProducts);
vendorRouter.get("/:vendorId/categories", getCategories);

export default vendorRouter;
