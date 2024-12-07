import { INTERNAL_SERVER_ERROR_STATUS, SUCCESS_STATUS } from "#utils/constants.js";
import { getGenders } from "#repository/students/getGenders.js";

export const getGendersController = async (req, res) => {
  try {
    const faculties = await getGenders();

    res.status(SUCCESS_STATUS).json(faculties);
  } catch (err) {
    handleError(res, err);
  }
};
