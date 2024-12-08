import { SUCCESS_STATUS } from "#utils/constants.js";
import { getSubjectTimes } from "#repository/subjects/getSubjectTimes.js";
import { createSubjectTime } from "#repository/subjects/createSubjectTime.js";
import { updateSubjectTime } from "#repository/subjects/updateSubjectTime.js";
import { deleteSubjectTime } from "#repository/subjects/deleteSubjectTime.js";
import { handleError } from "#utils/handleError.js";
import { ValidationError } from "#utils/errors.js";

export const getSubjectTimesController = async (req, res) => {
  try {
    const { code } = req.params;
    const subjectTimes = await getSubjectTimes(code);
    res.status(SUCCESS_STATUS).json(subjectTimes);
  } catch (err) {
    handleError(res, err);
  }
};

export const createSubjectTimeController = async (req, res) => {
  try {
    const { hour, day, classroom, capacity, fk_Subjectcode, even_week } = req.body;
    const subjectTimeId = await createSubjectTime(hour, day, classroom, capacity, fk_Subjectcode, even_week);
    res.status(SUCCESS_STATUS).json({
      success: true,
      subjectTimeId,
      message: "Successfully created subject time",
    });
  } catch (err) {
    handleError(res, err);
  }
};

export const updateSubjectTimeController = async (req, res) => {
  try {
    const { id } = req.params;
    const { hour, day, classroom, capacity, even_week, fk_Subjectcode } = req.body;

    if (hour === undefined || day === undefined || classroom === undefined || capacity === undefined || even_week === undefined || fk_Subjectcode === undefined) {
      throw new ValidationError("All fields (hour, day, classroom, capacity, even_week, subject_id) must be provided and valid");
    }

    await updateSubjectTime(id, hour, day, classroom, capacity, even_week, fk_Subjectcode);
    res.status(SUCCESS_STATUS).json({ success: true });
  } catch (err) {
    handleError(res, err);
  }
};

export const deleteSubjectTimeController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteSubjectTime(id);
    res.status(SUCCESS_STATUS).json({ success: true });
  } catch (err) {
    handleError(res, err);
  }
};