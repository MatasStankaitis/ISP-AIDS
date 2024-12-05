import { INTERNAL_SERVER_ERROR_STATUS } from "../constants.js";

export const handleError = (res, err) => {
  console.log(err);
  res
    .status(INTERNAL_SERVER_ERROR_STATUS)
    .json({ success: false, error: err.message });
};
