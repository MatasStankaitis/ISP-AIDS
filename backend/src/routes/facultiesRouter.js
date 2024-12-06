import { getFacultiesController } from "../controllers/facultiesControllers.js";

import express from "express";
const router = express.Router();

router.get("/", getFacultiesController);

export default router;
