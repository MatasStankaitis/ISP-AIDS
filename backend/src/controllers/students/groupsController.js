import { INTERNAL_SERVER_ERROR_STATUS, SUCCESS_STATUS } from "#utils/constants.js";
import { getGroups } from "#repository/students/getGroups.js";

export const getGroupsController = async (req, res) => {
  try {
    const faculties = await getGroups();

    res.status(SUCCESS_STATUS).json(faculties);
  } catch (err) {
    handleError(res, err);
  }
};
