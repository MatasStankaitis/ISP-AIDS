import { SUCCESS_STATUS } from "#utils/constants.js";
import { createSubject } from "#repository/subjects/createSubject.js";
import { getSubjects } from "#repository/subjects/getSubjects.js";
import { getSubject } from "#repository/subjects/getSubject.js";
import { updateSubject } from "#repository/subjects/updateSubject.js";
import { deleteSubject } from "#repository/subjects/deleteSubject.js";
import { handleError } from "#utils/handleError.js";

export const getSubjectsController = async (req, res) => {
  try {
    const subjects = await getSubjects();
    res.status(SUCCESS_STATUS).json(subjects);
  } catch (err) {
    handleError(res, err);
  }
};

export const getSubjectController = async (req, res) => {
  try {
    const { code } = req.params;
    const subject = await getSubject(code);
    res.status(SUCCESS_STATUS).json(subject);
  } catch (err) {
    handleError(res, err);
  }
};

export const createSubjectController = async (req, res) => {
  try {
    const {
      code,
      name,
      credits,
      description,
      language,
      is_remote,
      fk_Facultyid,
      year  // Add this parameter
    } = req.body;
    const subjectId = await createSubject(
      code,
      name,
      credits,
      description,
      language,
      is_remote,
      fk_Facultyid,
      year  // Add this value
    );
    res.status(SUCCESS_STATUS).json({
      success: true,
      subjectId,
      message: "Successfully created subject",
    });
  } catch (err) {
    handleError(res, err);
  }
};

export const updateSubjectController = async (req, res) => {
  try {
    const { code } = req.params;
    const { name, credits, description, language, is_remote, fk_Facultyid, year } =
      req.body;
    await updateSubject(
      code,
      name,
      credits,
      description,
      language,
      is_remote,
      fk_Facultyid,
      year  // Add this value
    );
    res.status(SUCCESS_STATUS).json({ success: true });
  } catch (err) {
    handleError(res, err);
  }
};

export const deleteSubjectController = async (req, res) => {
  try {
    const { code } = req.params;
    await deleteSubject(code);
    res.status(SUCCESS_STATUS).json({ success: true });
  } catch (err) {
    handleError(res, err);
  }
};
