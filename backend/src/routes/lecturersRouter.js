import express from "express";
import { 
  createLecturerController, 
  getLecturerStatusesController, 
  getAllLecturersController, 
  getSingleLecturerController,
  updateLecturerController,
  deleteLecturerController,
  updateLecturerSalaryController,
  getLecturerPaychecksController,
  addLecturerPaycheckController,
  updatePaycheckController
} from "#controllers/lecturers/lecturersController.js";
import { getGendersController } from "#controllers/students/gendersController.js";

const router = express.Router();

// Existing routes
router.get("/statuses", getLecturerStatusesController);
router.get("/genders", getGendersController);
router.get("/:username", getSingleLecturerController);
router.put("/:username", updateLecturerController);
router.get("/", getAllLecturersController);
router.post("/", createLecturerController);
router.delete("/:username", deleteLecturerController);
router.put("/:username/salary", updateLecturerSalaryController);
router.put("/:username/paychecks/:id", updatePaycheckController);

// New routes for handling paychecks
router.get("/:username/paychecks", getLecturerPaychecksController);
router.post("/:username/paychecks", addLecturerPaycheckController);

export default router;
