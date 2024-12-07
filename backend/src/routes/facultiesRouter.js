import { getFacultiesController } from "#controllers/students/facultiesControllers.js";

import express from "express";
const router = express.Router();

router.get("/", getFacultiesController);

export default router;
