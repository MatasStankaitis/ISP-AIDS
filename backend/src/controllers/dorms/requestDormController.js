// src/controllers/dorms/dormRequestsController.js
import { SUCCESS_STATUS } from "#utils/constants.js";
import { getDormRequests } from "#repository/dorms/getDormRequests.js";
import { getDormRequestsByStudent } from "#repository/dorms/getDormRequest.js";
import { createDormRequest } from "#repository/dorms/createDormRequest.js";
import { updateDormRequest } from "#repository/dorms/updateDormRequest.js";
import { handleError } from "#utils/handleError.js";

export const getDormRequestsController = async (req, res) => {
  try {
    const requests = await getDormRequests();
    res.status(SUCCESS_STATUS).json(requests);
  } catch (err) {
    handleError(res, err);
  }
};

export const createDormRequestController = async (req, res) => {
  try {
    const { studentUsername, type, description } = req.body;
    await createDormRequest(studentUsername, type, description);
    res.status(SUCCESS_STATUS).json({ 
      success: true,
      message: "Successfully created dorm request" 
    });
  } catch (err) {
    handleError(res, err);
  }
};

export const updateDormRequestController = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status, adminUsername } = req.body;
    await updateDormRequest(requestId, status, adminUsername);
    res.status(SUCCESS_STATUS).json({ success: true });
  } catch (err) {
    handleError(res, err);
  }
};

export const getDormRequestsByStudentController = async (req, res) => {
  try {
    const { username } = req.params;
    const requests = await getDormRequestsByStudent(username);
    res.status(SUCCESS_STATUS).json(requests);
  } catch (err) {
    handleError(res, err);
  }
};
