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
    const { studentUsername, title, type, description } = req.body;
    await createDormRequest(studentUsername, title, type, description);
    res.status(SUCCESS_STATUS).json({ 
      success: true,
      message: "Prašymas sukurtas sėkmingai" 
    });
  } catch (err) {
    handleError(res, err);
  }
};

export const updateDormRequestController = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;
    await updateDormRequest(requestId, status);
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
