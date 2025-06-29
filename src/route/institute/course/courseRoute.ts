import express, { Router ,Request } from "express";
import isLoggedIn from "../../../middleware/middleware";
import asyncErrorHandler from "../../../services/asyncErrorHandler";
import {
  createCourse,
  deleteCourse,
  getAllCourse,
  getSingleCourse,
} from "../../../controller/institute/course/courseController";

import multer from "multer";
import { cloudinary, storage } from "../../../services/cloudinaryConfig"; // Make sure this exports both

// Initialize upload with Cloudinary storage
const upload = multer({ storage:storage,
  fileFilter:(req:Request,file:Express.Multer.File,cb)=>{
    const allowFileTypes = ['image/png','image/jpg','image/jpeg']
if (allowFileTypes.includes(file.mimetype)){
  cb(null,true)

}else{
  cb(new Error ("only image supported"))
}
  },
  limits :{
    fileSize :4 * 1024 * 1024// 4 mb
  }
 });
 // cb (eeror ,sucess) , aauta cb(error )

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
