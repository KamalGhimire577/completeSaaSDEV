// route/institute/instituteRoute.ts
import  { Router } from "express";

import isLoggedIn from "../../middleware/middleware";
import upload from "../../middleware/multerMiddleware";
import {
  createInstitute,
  createTeacherTable,
  createStudentTable,
  createCourseTable,
} from "../../controller/institute/intituteController";
import asyncErrorHandler from "../../services/asyncErrorHandler";

const router = Router();


// Debug test


router.post(
  "/creat",
  isLoggedIn,
  upload.single("instituteLogo"),
  asyncErrorHandler(createInstitute),
  asyncErrorHandler(createTeacherTable),
  asyncErrorHandler(createStudentTable),
  asyncErrorHandler(createCourseTable)
);

export default router;
