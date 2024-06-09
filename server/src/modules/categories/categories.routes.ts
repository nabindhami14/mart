import express from "express";
import {
    createCategoery,
    getCategories,
    getProducts,
} from "./categories.controller";

const categoryRouter = express.Router();

// routes
categoryRouter.post("/", createCategoery);
categoryRouter.get("/", getCategories);
categoryRouter.get("/:categoryId", getProducts);

export default categoryRouter;
