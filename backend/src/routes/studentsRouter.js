import { getStudentsController } from "../controllers/studentsController.js";
import express from "express";
const router = express.Router();

router.get("/", getStudentsController);
router.post("/", (req, res) => {});
router.get("/:username", (req, res) => {});
router.put("/:username", (req, res) => {});
router.delete("/:username", (req, res) => {});

export default router;
