import { SUCCESS_STATUS } from "#utils/constants.js";
import { getSubjectTimes } from "#repository/subjects/getSubjectTimes.js";
import { updateSubjectTime } from "#repository/subjects/updateSubjectTime.js";
import { deleteSubjectTime } from "#repository/subjects/deleteSubjectTime.js";
import { handleError } from "#utils/handleError.js";

export const getSubjectTimesController = async (req, res) => {
  try {
    const { code } = req.params;
    const subjectTimes = await getSubjectTimes(code);
    res.status(SUCCESS_STATUS).json(subjectTimes);
  } catch (err) {
    handleError(res, err);
  }
};

export const updateSubjectTimeController = async (req, res) => {
  try {
    const { id } = req.params;
    const { hour, day, classroom, capacity } = req.body;
    await updateSubjectTime(id, hour, day, classroom, capacity);
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