import express from "express";
import studentsRouter from "./routes/studentsRouter.js";
const router = express.Router();

router.use("/students", studentsRouter);

export default router;
