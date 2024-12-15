import { getGroupsController } from "#controllers/students/groupsController.js";
import express from "express";
const router = express.Router();

router.get("/", getGroupsController);

export default router;
