// src/controllers/dorms/dormReservationController.js
import { SUCCESS_STATUS } from "#utils/constants.js";
import { reserveDormRoom } from "#repository/dorms/reserveDormRoom.js";
import { cancelDormReservation } from "#repository/dorms/cancelDormReservation.js";
import { handleError } from "#utils/handleError.js";

export const reserveDormRoomController = async (req, res) => {
  try {
    const { roomId, studentUsername } = req.body;
    await reserveDormRoom(roomId, studentUsername);
    res.status(SUCCESS_STATUS).json({
      success: true,
      message: "Successfully reserved room"
    });
  } catch (err) {
    handleError(res, err);
  }
};

export const cancelDormReservationController = async (req, res) => {
  try {
    const { roomId } = req.params;
    await cancelDormReservation(roomId);
    res.status(SUCCESS_STATUS).json({ success: true });
  } catch (err) {
    handleError(res, err);
  }
};