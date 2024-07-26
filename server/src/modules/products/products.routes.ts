import express from "express";
import upload from "../../middlewares/upload";
import { createProduct, getProduct, getProducts } from "./products.controller";

const productsRouter = express.Router();

// routes
productsRouter.post("/", upload.array("images"), createProduct);
productsRouter.get("/", getProducts);
productsRouter.get("/:productId", getProduct);

export default productsRouter;
