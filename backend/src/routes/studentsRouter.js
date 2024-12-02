import { getStudentsController } from "../controllers/studentsController.js";
import express from "express";
const router = express.Router();

router.get("/", getStudentsController);

export default router;
