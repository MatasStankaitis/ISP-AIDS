import { SUCCESS_STATUS } from "#utils/constants.js";
import { getStudentSubjects } from "#repository/subjects/getStudentSubjects.js";
import { deleteStudentSubject } from "#repository/subjects/deleteStudentSubject.js";
import { createStudentSubject } from "#repository/subjects/createStudentSubject.js";
import { handleError } from "#utils/handleError.js";

export const getStudentSubjectsController = async (req, res) => {
  try {
    const { username } = req.params;
    const subjects = await getStudentSubjects(username);
    res.status(SUCCESS_STATUS).json(subjects);
  } catch (err) {
    handleError(res, err);
  }
};

export const deleteStudentSubjectController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error("Student subject ID is required");
    }

    await deleteStudentSubject(id);
    res.status(SUCCESS_STATUS).json({ success: true });
  } catch (err) {
    handleError(res, err);
  }
};

export const createStudentSubjectController = async (req, res) => {
    try {
      const { studentUsername, subjectTimeId } = req.body;
  
      if (!studentUsername || !subjectTimeId) {
        throw new ValidationError("Student username and subject time ID are required");
      }
  
      const studentSubjectId = await createStudentSubject(studentUsername, subjectTimeId);
      res.status(SUCCESS_STATUS).json({
        success: true,
        studentSubjectId, // Include the ID in the response
        message: "Successfully created student subject",
      });
    } catch (err) {
      handleError(res, err);
    }
  };