// gradesControllers.js
import { getStudentGradesBySubject } from "#repository/grades/getGrades.js";
import { addStudentGrade } from "#repository/grades/addGrade.js";
import { updateStudentGradesBySubjectAndStudent } from "#repository/grades/updateGrades.js";
import { SUCCESS_STATUS, NOT_FOUND_STATUS, BAD_REQUEST_STATUS } from "#utils/constants.js";
import { handleError } from "#utils/handleError.js";

  
  // Controller to get all grades for a student in a subject
  export const getGradesController = async (req, res) => {
    try {
      const { subjectCode, username } = req.params;
  
      if (!subjectCode || !username) {
        return res.status(BAD_REQUEST_STATUS).json({ message: "Subject code and username are required." });
      }
  
      const grades = await getStudentGradesBySubject(subjectCode, username);
  
      if (grades.length === 0) {
        res.status(NOT_FOUND_STATUS).json({ message: "No grades found." });
      } else {
        res.status(SUCCESS_STATUS).json(grades);
      }
    } catch (err) {
      handleError(res, err);
    }
  };
  
  // Controller to add a new grade for a student in a subject
  export const addGradeController = async (req, res) => {
    try {
      const { subjectCode, username } = req.params;
      const {
        value,
        comment,
        is_exam,
        importance,
      } = req.body;
  
      // Validate required fields
      if (value === undefined) {
        return res.status(BAD_REQUEST_STATUS).json({ message: "Value is required." });
      }
  
      // Retrieve fk_StudentSubjectid based on subjectCode and username
      const [studentSubjectRows] = await connection.execute(
        `SELECT ss.id
         FROM Student_subjects ss
         INNER JOIN Students s ON ss.fk_Studentusername = s.username
         INNER JOIN Subject_times st ON ss.fk_SubjectTimeid = st.id
         WHERE st.fk_Subjectcode = ? AND s.username = ?`,
        [subjectCode, username]
      );
  
      if (studentSubjectRows.length === 0) {
        return res.status(NOT_FOUND_STATUS).json({ message: "Student or subject not found." });
      }
  
      const fk_StudentSubjectid = studentSubjectRows[0].id;
  
      const created_at = new Date();
      const updated_at = new Date();
  
      await addStudentGrade(
        value,
        comment,
        created_at,
        updated_at,
        is_exam,
        importance,
        fk_StudentSubjectid
      );
  
      res.status(SUCCESS_STATUS).json({ message: "Grade added successfully." });
    } catch (err) {
      handleError(res, err);
    }
  };
  
  // Controller to update grades for a student in a subject
  export const updateGradeController = async (req, res) => {
    try {
      const { subjectCode, username } = req.params;
      const gradesToUpdate = req.body.grades; // Expecting an array of grade objects
  
      if (!gradesToUpdate || !Array.isArray(gradesToUpdate)) {
        return res
          .status(BAD_REQUEST_STATUS)
          .json({ message: "Grades data is required and should be an array." });
      }
  
      // Retrieve fk_StudentSubjectid based on subjectCode and username
      const [studentSubjectRows] = await connection.execute(
        `SELECT ss.id AS studentSubjectId, st.fk_Subjectcode
         FROM Student_subjects ss
         INNER JOIN Students s ON ss.fk_Studentusername = s.username
         INNER JOIN Subject_times st ON ss.fk_SubjectTimeid = st.id
         WHERE st.fk_Subjectcode = ? AND s.username = ?`,
        [subjectCode, username]
      );
  
      if (studentSubjectRows.length === 0) {
        return res
          .status(NOT_FOUND_STATUS)
          .json({ message: "Student or subject not found." });
      }
  
      const fk_StudentSubjectid = studentSubjectRows[0].studentSubjectId;
  
      // Update each grade
      for (const gradeData of gradesToUpdate) {
        const {
          value,
          comment,
          is_exam,
          importance,
          created_at, // Use created_at to identify the grade
        } = gradeData;
  
        if (value === undefined || !created_at) {
          continue; // Skip if required fields are missing
        }
  
        await updateStudentGradesBySubjectAndStudent(
          fk_StudentSubjectid,
          value,
          comment,
          is_exam,
          importance,
          created_at
        );
      }
  
      res.status(SUCCESS_STATUS).json({ message: "Grades updated successfully." });
    } catch (err) {
      handleError(res, err);
    }
  };