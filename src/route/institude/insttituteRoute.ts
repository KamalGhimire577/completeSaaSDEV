import express, { Router } from "express";

import isLoggedIn from "../../middleware/middleware";
import {
  createCourseTable,
  createInstitute,
  createStudentTable,
  createTeacherTable,
} from "../../controller/institute/intritudeController";
import asyncErrorHandler from "../../services/asyncErrorHandler";
import { multer, storage } from "./../../middleware/multerMiddleware";

const router: Router = express.Router();

router.route("/").post(
  isLoggedIn,
  asyncErrorHandler(createInstitute),
  asyncErrorHandler(createTeacherTable),
  asyncErrorHandler(createStudentTable),
  asyncErrorHandler(createCourseTable),
  
  )


export default router;
