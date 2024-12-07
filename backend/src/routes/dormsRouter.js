import express from "express";
import {
  getDormsController,
  getDormController,
  createDormController,
  updateDormController,
  deleteDormController,
  getDormRoomsController,
  updateDormRoomController
} from "#controllers/dorms/commonDormController.js";
import {
  getDormRequestsController,
  createDormRequestController,
  updateDormRequestController,
  getDormRequestsByStudentController // Add this import
} from "#controllers/dorms/requestDormController.js";
import {
  reserveDormRoomController,
  cancelDormReservationController
} from "#controllers/dorms/reservationDormController.js";

const router = express.Router();

// Dorm requests routes
router.get("/requests", getDormRequestsController);
router.get("/requests/student/:username", getDormRequestsByStudentController); // Add this route before other parameterized routes
router.post("/requests", createDormRequestController);
router.put("/requests/:requestId", updateDormRequestController);

// Dorm management routes
router.get("/", getDormsController);
router.post("/", createDormController);
router.get("/:id", getDormController);
router.put("/:id", updateDormController);
router.delete("/:id", deleteDormController);
router.get("/:dormId/rooms", getDormRoomsController);
router.put("/rooms/:roomId", updateDormRoomController);

// Dorm reservation routes
router.post("/rooms/reserve", reserveDormRoomController);
router.delete("/rooms/:roomId/reserve", cancelDormReservationController);

export default router;