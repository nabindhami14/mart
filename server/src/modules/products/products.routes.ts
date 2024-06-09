import express from "express";
import { createProduct, getProduct, getProducts } from "./products.controller";

const productsRouter = express.Router();

// routes
productsRouter.post("/", createProduct);
productsRouter.get("/", getProducts);
productsRouter.get("/:productId", getProduct);

export default productsRouter;
