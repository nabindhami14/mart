import express from "express";

import { getOverview } from "./admin.controller";

const adminRouter = express.Router();

adminRouter.get("/overview", getOverview);

export default adminRouter;
