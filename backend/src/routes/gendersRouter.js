import { getGendersController } from "#controllers/students/gendersController.js";

import express from "express";
const router = express.Router();

router.get("/", getGendersController);

export default router;
