import { Request, Response } from "express";
import sequelize from "../../../database/connection";

import { IExtendedRequest } from "../../../middleware/type";



const createCourse =async(req:IExtendedRequest,res:Response)=>{
    const instituteNumber =req.user?.currentInstituteNumber
    const {coursePrice,courseName,courseDescription,courseDuration,courseLevel}=req.body
    if(!coursePrice || !courseName||!courseDescription||!courseDuration||!courseLevel){
        return res.status(400).json({
            message:"Please provide coursePrice,courseName,courseDescription,courseDuration,courseLevel"
        })
    }
    const courseThumbnail = req.file ? req.file.fieldname :null
     const returnData = await sequelize.query(
      `INSERT INTO course_${instituteNumber} (coursePrice,courseName,courseDescription,courseDuration,courseLevel,courseThumbnail)VALUES(?,?,?,?,?,?)`,
      {
        replacements: [
          coursePrice,
          courseName,
          courseDescription,
          courseDuration,
          courseLevel,
          courseThumbnail||''
        ],
      }
    )
    console.log (returnData)
    res.status(200).json({
        message: "course created sucessfully"
    })

}
const deleteCourse =async(req:IExtendedRequest,res:Response)=>{
  const instituteNumber = req.user?.currentInstituteNumber;
  const courseId = req.params.id;
  //acess
  /// first ma course axist garxa ki nai check garum ami delete garam

  const[courseData] = await sequelize.query(
    `SELECT * FROM course_${instituteNumber}WHERE id =?`,
    { replacements: [courseId] }
  );
  // yo typesript ko error ho so hamile yeslai [courseData] garer thik parxam
  if (courseData.length == 0) {
    return res.status(404).json({
      message: "no course with that id",
    });
  }

  await sequelize.query(`DELETE FROM course_${instituteNumber} WHERE id = ?`, {
    replacements: [courseId],
  });
  res.status(200).json({
    message: "course deleted successfully",
  });
}

const getAllCourse =async(req:IExtendedRequest,res:Response)=>{
    const instituteNumber =req.user?.currentInstituteNumber;
    const courses = await sequelize.query(`SELECT FROM course_${instituteNumber}`)
res.status (200).json({
    message :"Courses fetched",
    data :courses
})
}
const getSingleCourse = async (req:IExtendedRequest,res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber;
    const courseId = req.params.id
    const course = await sequelize.query(`SELECT * FROM course)_${instituteNumber} WHERE id =?`,{
        replacements:[courseId]
    })
    res.status(200).json({
        message : "single course fetched",
        data:course
    })
}

export{createCourse,deleteCourse,getAllCourse,getSingleCourse}