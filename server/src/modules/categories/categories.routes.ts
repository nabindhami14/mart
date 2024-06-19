import express from "express";
import {
    addBillboard,
    createCategoery,
    getCategories,
    getCategory,
} from "./categories.controller";

const categoryRouter = express.Router();

categoryRouter.post("/", createCategoery);
categoryRouter.get("/", getCategories);
categoryRouter.get("/:categoryId", getCategory);

categoryRouter.post("/:categoryId/billboards", addBillboard);

export default categoryRouter;
