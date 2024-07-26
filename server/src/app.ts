import cors from "cors";
import express from "express";
import morgan from "morgan";

import config from "./config";

import adminRouter from "./modules/admin/admin.routes";
import customerRouter from "./modules/customer/customer.routes";
import vendorRouter from "./modules/vendors/vendors.routes";

import categoriesRouter from "./modules/categories/categories.routes";
import productsRouter from "./modules/products/products.routes";

import orderRouter from "./modules/orders/order.routes";

import globalErrorHandler from "./middlewares/globalErrorHandler";
import path from "node:path";

const app = express();

app.use(
    cors({
        origin: config.frontendDomain,
    })
);

app.use(express.json());
app.use(morgan("dev"));
app.use("/public", express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res, next) => {
    res.json({ message: "Health Check" });
});

app.use("/api/customers", customerRouter);
app.use("/api/admins", adminRouter);
app.use("/api/vendors", vendorRouter);

app.use("/api/categories", categoriesRouter);
app.use("/api/products", productsRouter);

app.use("/api/orders", orderRouter);

// Global error handler
app.use(globalErrorHandler);

export default app;
