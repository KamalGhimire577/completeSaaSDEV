import { Request, Response } from "express";
import sequelize from "../../../database/connection";

import { IExtendedRequest } from "../../../middleware/type";

import { QueryTypes } from "sequelize";

const createCourse =async(req:IExtendedRequest,res:Response)=>{
    const instituteNumber =req.user?.currentInstituteNumber
    const {coursePrice,courseName,courseDescription,courseDuration,courseLevel,categoryId}=req.body
    if(!coursePrice || !courseName||!courseDescription||!courseDuration||!courseLevel||!categoryId){
        return res.status(400).json({
            message:"Please provide coursePrice,courseName,courseDescription,courseDuration,courseLevel"
        })
    }
    // this only give fielname text on database 
    // const courseThumbnail = req.file ? req.file.fieldname : null;// terniory operator
   // const courseThumbnail = req.file ? `storage/${req.file.filename}` : null;
    /// above was correct
    const courseThumbnail =req.file?req.file.path : null
     const returnData = await sequelize.query(
       `INSERT INTO course_${instituteNumber} (coursePrice,courseName,courseDescription,courseDuration,courseLevel,courseThumbnail,categoryId)VALUES(?,?,?,?,?,?,?)`,
       {
         type: QueryTypes.INSERT,
         replacements: [
           coursePrice,
           courseName,
           courseDescription,
           courseDuration,
           courseLevel,
           courseThumbnail,
           categoryId,
         ],
       }
     );
    console.log (returnData)
    console.log("Uploaded File:", req.file);
    res.status(200).json({
        message: "course created sucessfully"

    })

}
const deleteCourse =async(req:IExtendedRequest,res:Response)=>{
  const instituteNumber = req.user?.currentInstituteNumber;
  const courseId = req.params.id;
  //acess
  /// first ma course axist garxa ki nai check garum ami delete garam

  const courseData = await sequelize.query(
    `SELECT * FROM course_${instituteNumber}WHERE id =?`,
    { replacements: [courseId],
       type: QueryTypes.SELECT 
      });
  // yo typesript ko error ho so hamile yeslai [courseData] garer thik parxam
  if (courseData.length == 0) {
    return res.status(404).json({
      message: "no course with that id",
    });
  }

  await sequelize.query(`DELETE FROM course_${instituteNumber} WHERE id = ?`, {
    replacements: [courseId],
    type: QueryTypes.DELETE,
  });
  res.status(200).json({
    message: "course deleted successfully",
  });
}

const getAllCourse = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber;

    // Get all course-related tables
 const datas = await sequelize.query(`SHOW TABLES LIKE 'course_%';`);

    // Query dynamic table
    const tableName = `course_${instituteNumber}`;
    const courses = await sequelize.query(
      `SELECT * FROM course_${instituteNumber} JOIN category_${instituteNumber} ON course_${instituteNumber}.categoryId = category_${instituteNumber}.id`,
      { // category table ko content lai yata join garako 
        type: QueryTypes.SELECT,
      }
    );

     res.status(200).json({
      message: "Courses fetched",
      data: courses,
      datas,
    });
    return;
  } 



const getSingleCourse = async (req:IExtendedRequest,res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber;
    const courseId = req.params.id
    const course = await sequelize.query(
      `SELECT * FROM course)_${instituteNumber} WHERE id =?`,
      {
        replacements: [courseId],
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({
        message : "single course fetched",
        data:course
    })
}

export{createCourse,deleteCourse,getAllCourse,getSingleCourse}