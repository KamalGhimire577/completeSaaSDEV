
import multer from "multer";
import { cloudinary, storage } from "../services/cloudinaryConfig"; // Make sure this exports both
import { Request } from "express";

// Initialize upload with Cloudinary storage
const upload = multer({
  storage: storage,
  fileFilter: (req: Request, file: Express.Multer.File, cb) => {
    const allowFileTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (allowFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("only image supported"));
    }
  },
  limits: {
    fileSize: 4 * 1024 * 1024, // 4 mb
  },
});
// cb (eeror ,sucess) , aauta cb(error )

export default upload