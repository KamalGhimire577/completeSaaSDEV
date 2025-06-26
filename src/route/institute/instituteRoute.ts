// route/institute/instituteRoute.ts
import { Router } from "express";
import isLoggedIn from "../../middleware/middleware";
import {
  createInstitute,
  createTeacherTable,
  createStudentTable,
  createCourseTable,
  createCategoryTable, // ✅ Import the new category table creation middleware
} from "../../controller/institute/intituteController";
import asyncErrorHandler from "../../services/asyncErrorHandler";

const router = Router();

// Route without file upload (no multer)
router.post(
  "/create",
  isLoggedIn,
  asyncErrorHandler(createInstitute),
  asyncErrorHandler(createTeacherTable),
  asyncErrorHandler(createStudentTable),
  asyncErrorHandler(createCourseTable),
  asyncErrorHandler(createCategoryTable) // ✅ Add this here
  
);

export default router;
