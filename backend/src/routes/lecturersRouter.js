import express from "express";
import { createLecturerController, getLecturerStatusesController, getAllLecturersController } from "#controllers/lecturers/lecturersController.js";
import { getGendersController } from "#controllers/students/gendersController.js";
import { getSingleLecturerController } from "#controllers/lecturers/lecturersController.js";
import { updateLecturerController } from "#controllers/lecturers/lecturersController.js";
import { deleteLecturerController } from "#controllers/lecturers/lecturersController.js";
import { updateLecturerSalaryController } from "#controllers/lecturers/lecturersController.js";

const router = express.Router();

router.get("/statuses", getLecturerStatusesController);
router.get("/genders", getGendersController);
router.get("/:username", getSingleLecturerController);
router.put("/:username", updateLecturerController);
router.get("/", getAllLecturersController);
router.post("/", createLecturerController);
router.delete("/:username", deleteLecturerController);
router.put("/:username/salary", updateLecturerSalaryController);


export default router;
