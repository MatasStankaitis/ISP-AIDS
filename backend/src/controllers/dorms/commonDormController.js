// src/controllers/dorms/dormsController.js
import { SUCCESS_STATUS } from "#utils/constants.js";
import { createDorm } from "#repository/dorms/createDorm.js";
import { getDorms } from "#repository/dorms/getDorms.js";
import { getDorm } from "#repository/dorms/getDorm.js";
import { updateDorm } from "#repository/dorms/updateDorm.js";
import { deleteDorm } from "#repository/dorms/deleteDorm.js";
import { createDormRoom } from "#repository/dorms/createDormRoom.js";
import { getDormRooms } from "#repository/dorms/getDormRooms.js";
import { updateDormRoom } from "#repository/dorms/updateDormRoom.js";
import { handleError } from "#utils/handleError.js";
import { ValidationError } from "#utils/errors.js";

export const getDormsController = async (req, res) => {
  try {
    const dorms = await getDorms();
    res.status(SUCCESS_STATUS).json(dorms);
  } catch (err) {
    handleError(res, err);
  }
};

export const getDormController = async (req, res) => {
  try {
    const { id } = req.params;
    const dorm = await getDorm(id);
    res.status(SUCCESS_STATUS).json(dorm);
  } catch (err) {
    handleError(res, err);
  }
};

export const createDormController = async (req, res) => {
  try {
    const { number, address, room_count } = req.body;
    const dormId = await createDorm(number, address, room_count);
    res.status(201).json({
      success: true,
      dormId,
      message: "Successfully created dorm",
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const updateDormController = async (req, res) => {
  try {
    const { id } = req.params;
    const { number, address, room_count } = req.body;
    await updateDorm(id, number, address, room_count);
    res.status(SUCCESS_STATUS).json({ success: true });
  } catch (err) {
    handleError(res, err);
  }
};

export const deleteDormController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteDorm(id);
    res.status(SUCCESS_STATUS).json({ success: true });
  } catch (err) {
    handleError(res, err);
  }
};

export const getDormRoomsController = async (req, res) => {
  try {
    const { dormId } = req.params;
    const rooms = await getDormRooms(dormId);
    res.status(SUCCESS_STATUS).json(rooms);
  } catch (err) {
    handleError(res, err);
  }
};

export const updateDormRoomController = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { status } = req.body;
    await updateDormRoom(roomId, status);
    res.status(SUCCESS_STATUS).json({ success: true });
  } catch (err) {
    handleError(res, err);
  }
}

export const createDormRoomController = async (req, res) => {
  try {
    const { roomNumber, floorNumber, price, quality, status, fk_Dormid } = req.body;
    const roomId = await createDormRoom(roomNumber, floorNumber, price, quality, status, fk_Dormid);
    res.status(SUCCESS_STATUS).json({
      success: true,
      roomId,
      message: "Successfully created dorm room",
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}