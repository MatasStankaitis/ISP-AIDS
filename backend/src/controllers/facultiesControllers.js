import { INTERNAL_SERVER_ERROR_STATUS, SUCCESS_STATUS } from "../constants.js";
import { getFaculties } from "../repository/getFaculties.js";

export const getFacultiesController = async (req, res) => {
  try {
    const faculties = await getFaculties();

    res.status(SUCCESS_STATUS).json(faculties);
  } catch (err) {
    handleError(res, err);
  }
};
