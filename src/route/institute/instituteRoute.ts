import express, { Router } from "express";

import isLoggedIn from "../../middleware/middleware";
import {
  createCourseTable,
  createInstitute,
  createStudentTable,
  createTeacherTable,
} from "../../controller/institute/intrituteController";
import asyncErrorHandler from "../../services/asyncErrorHandler";
// import { multer, storage } from "../../middleware/multerMiddleware";

const router:Router = express.Router();

//const upload = multer({storage :storage})
// fronent ans opstman bat k name ma aauxa file teslai fiel name vanva
router.route("/").post(isLoggedIn,asyncErrorHandler(createInstitute), asyncErrorHandler(createTeacherTable), asyncErrorHandler(createStudentTable), asyncErrorHandler(createCourseTable),
  
  )


export default router;
