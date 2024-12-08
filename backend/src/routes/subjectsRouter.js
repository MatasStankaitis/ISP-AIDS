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

const router = express.Router();

router.get("/", getSubjectsController);
router.get("/:code", getSubjectController);
router.get("/:code/times", getSubjectTimesController);
router.post("/", createSubjectController);
router.post("/:code/times", createSubjectTimeController);
router.put("/:code", updateSubjectController);
router.delete("/:code", deleteSubjectController);
router.put("/times/:id", updateSubjectTimeController);
router.delete("/times/:id", deleteSubjectTimeController);

export default router;