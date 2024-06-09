import express from "express";
import { createProduct, getProduct } from "./products.controller";

const productsRouter = express.Router();

// routes
productsRouter.post("/", createProduct);
productsRouter.get("/:productId", getProduct);

export default productsRouter;
