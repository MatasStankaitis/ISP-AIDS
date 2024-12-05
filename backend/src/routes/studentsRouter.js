import {
  putStudentController,
  getStudentsController,
  getStudentByUsernameController,
  postStudentController,
  deleteStudentController,
} from "../controllers/studentsController.js";
import express from "express";
const router = express.Router();

router.get("/", getStudentsController);
router.post("/", postStudentController);
router.get("/:username", getStudentByUsernameController);
router.put("/:username", putStudentController);
router.delete("/:username", deleteStudentController);

export default router;
