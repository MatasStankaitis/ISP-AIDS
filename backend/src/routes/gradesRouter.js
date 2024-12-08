// gradesRouter.js
import {
    getGradesController,
    addGradeController,
    updateGradeController,
  } from "#controllers/grades/gradesControllers.js";
  import express from "express";
  
  const router = express.Router();
  
  // Get all grades for a student in a subject
  router.get("/:subjectCode/students/:username/grades", getGradesController);
  
  // Add a new grade for a student in a subject
  router.post("/:subjectCode/students/:username/grades", addGradeController);
  
  // Update grades for a student in a subject
  router.put("/:subjectCode/students/:username/grades", updateGradeController);
  
  export default router;