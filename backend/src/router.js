import express from "express";
import studentsRouter from "./routes/studentsRouter.js";
import groupsRouter from "./routes/groupsRouter.js";
import gendersRouter from "./routes/gendersRouter.js";
import facultiesRouter from "./routes/facultiesRouter.js";
import dormsRouter from "./routes/dormsRouter.js";
import subjectsRouter from "./routes/subjectsRouter.js";

const router = express.Router();

router.use("/students", studentsRouter);
router.use("/groups", groupsRouter);
router.use("/genders", gendersRouter);
router.use("/faculties", facultiesRouter);
router.use("/dorms", dormsRouter);
router.use("/subjects", subjectsRouter);

export default router;
