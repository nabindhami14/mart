import cors from "cors";
import express from "express";

import config from "./config";

import categoriesRouter from "./modules/categories/categories.routes";
import customerRouter from "./modules/customer/customer.routes";

import globalErrorHandler from "./middlewares/globalErrorHandler";
import orderRouter from "./modules/orders/order.routes";
import productsRouter from "./modules/products/products.routes";
import vendorRouter from "./modules/vendors/vendors.routes";

const app = express();

app.use(
    cors({
        origin: config.frontendDomain,
    })
);

app.use(express.json());

app.get("/", (req, res, next) => {
    res.json({ message: "Health Check" });
});

app.use("/api/users", customerRouter);
app.use("/api/vendors", vendorRouter);

app.use("/api/categories", categoriesRouter);
app.use("/api/products", productsRouter);

app.use("/api/orders", orderRouter);

// Global error handler
app.use(globalErrorHandler);

export default app;
