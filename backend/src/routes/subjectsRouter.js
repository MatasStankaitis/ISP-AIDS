import express from "express";
import {
  getSubjectsController,
  getSubjectController,
  createSubjectController,
  updateSubjectController,
  deleteSubjectController,
} from "#controllers/subjects/subjectsController.js";
import {
  getSubjectTimesController,
  createSubjectTimeController,
  updateSubjectTimeController,
  deleteSubjectTimeController,
} from "#controllers/subjects/subjectTimesController.js";
import {
  getStudentSubjectsController,
  deleteStudentSubjectController,
  createStudentSubjectController,
} from "#controllers/subjects/studentSubjectsController.js";

const router = express.Router();

router.get("/", getSubjectsController);
router.get("/:code", getSubjectController);
router.get("/:code/times", getSubjectTimesController);
router.get("/student-subjects/:username", getStudentSubjectsController);
router.post("/", createSubjectController);
router.post("/:code/times", createSubjectTimeController);
router.post("/student-subjects", createStudentSubjectController);
router.put("/:code", updateSubjectController);
router.delete("/:code", deleteSubjectController);
router.put("/times/:id", updateSubjectTimeController);
router.delete("/times/:id", deleteSubjectTimeController);
router.delete("/student-subjects/:id", deleteStudentSubjectController);

export default router;