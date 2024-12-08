import express from "express";
import { createLecturerController, getLecturerStatusesController, getAllLecturersController } from "#controllers/lecturers/lecturersController.js";
import { getGendersController } from "#controllers/students/gendersController.js";

const router = express.Router();

router.get("/statuses", getLecturerStatusesController);
router.get("/genders", getGendersController); // Add this route
router.get("/", getAllLecturersController);
router.post("/", createLecturerController);

export default router;
