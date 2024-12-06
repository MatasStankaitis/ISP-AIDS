import {
  INTERNAL_SERVER_ERROR_STATUS,
  NOT_FOUND_ERROR_STATUS,
  VALIDATION_ERROR_STATUS,
} from "../constants.js";
import { NotFoundError, ValidationError } from "./errors.js";

export const handleError = (res, err) => {
  console.log(err);
  if (err instanceof NotFoundError) {
    res
      .status(NOT_FOUND_ERROR_STATUS)
      .json({ success: false, error: err.message });
  } else if (err instanceof ValidationError) {
    res
      .status(VALIDATION_ERROR_STATUS)
      .json({ success: false, error: err.message });
  } else {
    res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .json({ success: false, error: err.message });
  }
};
