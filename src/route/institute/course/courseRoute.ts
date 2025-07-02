import express, { Router ,Request } from "express";
import isLoggedIn from "../../../middleware/middleware";
import asyncErrorHandler from "../../../services/asyncErrorHandler";
import {
  createCourse,
  deleteCourse,
  getAllCourse,
  getSingleCourse,
} from "../../../controller/institute/course/courseController";

import upload from "../../../middleware/multerUpload";

const router: Router = express.Router();

// Create and fetch courses
router
  .route("/")
  .post(
    isLoggedIn,
    upload.single("courseThumbnail"), // ✅ Field name expected from Postman/frontend
    asyncErrorHandler(createCourse)
  )
  .get( isLoggedIn,asyncErrorHandler(getAllCourse));

// Get or delete single course
router
  .route("/:id") // ✅ corrected from "/id"
  .get(asyncErrorHandler(getSingleCourse))
  .delete(isLoggedIn, asyncErrorHandler(deleteCourse));

export default router;
