import { getGroupsController } from "../controllers/groupsController.js";
import express from "express";
const router = express.Router();

router.get("/", getGroupsController);

export default router;
