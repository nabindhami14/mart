import express from "express";
import {
    addBillboard,
    getCategories,
    getOrders,
    getProducts,
    getVendor,
    getVendors,
    loginVendor,
    registerVendor,
} from "./vendors.controller";

const vendorRouter = express.Router();

// routes
vendorRouter.post("/auth/register", registerVendor);
vendorRouter.post("/auth/login", loginVendor);

vendorRouter.get("/", getVendors);
vendorRouter.get("/:vendorId", getVendor);

vendorRouter.get("/:vendorId/products", getProducts);
vendorRouter.get("/:vendorId/categories", getCategories);
vendorRouter.get("/:vendorId/orders", getOrders);

vendorRouter.patch("/:vendorId/billboards", addBillboard);

export default vendorRouter;

// REGISTER VENDOR
// ADMIN APPROVES

// GET VENDORS
// VENDOR (BILLBOARDS, CATEGORIES, PRODUCTS)

// VENDOR ORDERS
// VENDOR PRODUCTS
// VENDOR CATEGORIES
