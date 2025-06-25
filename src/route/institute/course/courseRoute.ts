import express, { Router } from "express";

import isLoggedIn from "../../../middleware/middleware";

import asyncErrorHandler from "../../../services/asyncErrorHandler";
import { createCourse, deleteCourse, getAllCourse, getSingleCourse } from "../../../controller/institute/course/courseController";
import upload from "../../../middleware/multerMiddleware";
const router: Router = express.Router();
//const upload = multer({storage : storage}) // confugation gareko
router
  .route("/")
  .post(
    isLoggedIn,
    // upload.single("courseThumbnail"),
    upload.single("courseThumbnail"),
    asyncErrorHandler(createCourse)
  )
  .get(asyncErrorHandler(getAllCourse));// fielname vaneko frontend /postman bata chai k name aairaxa file vanne kura ho


  router.route("/id").get(asyncErrorHandler(getSingleCourse)).delete(isLoggedIn,asyncErrorHandler(deleteCourse))
 

export default router;
