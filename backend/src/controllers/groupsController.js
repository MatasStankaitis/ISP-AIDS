import { INTERNAL_SERVER_ERROR_STATUS, SUCCESS_STATUS } from "../constants.js";
import { getGroups } from "../repository/getGroups.js";

export const getGroupsController = async (req, res) => {
  try {
    const faculties = await getGroups();

    res.status(SUCCESS_STATUS).json(faculties);
  } catch (err) {
    handleError(res, err);
  }
};
