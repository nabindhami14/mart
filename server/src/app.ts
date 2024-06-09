import cors from "cors";
import express from "express";

import config from "./config";

import billboardRouter from "./modules/billboards/billboards.routes";
import categoriesRouter from "./modules/categories/categories.routes";
import customerRouter from "./modules/customer/customer.routes";

import globalErrorHandler from "./middlewares/globalErrorHandler";
import productsRouter from "./modules/products/products.routes";

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
app.use("/api/categories", categoriesRouter);
app.use("/api/billboards", billboardRouter);
app.use("/api/products", productsRouter);

// Global error handler
app.use(globalErrorHandler);

export default app;
