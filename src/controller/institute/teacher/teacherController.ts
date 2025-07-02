import { Request, Response } from "express";
import { IExtendedRequest } from "../../../middleware/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";
import generateRandomPassword from "../../../services/generateRandomPassword";
import sendMail from "../../../services/sendmail";
import { text } from "stream/consumers";


/// mysql not support array




// MySQL does not support arrays

const createTeacher = async (req: IExtendedRequest, res: Response) => {
  // Teacher ko k k data chahinchha tyo accept garam
  const instituteNumber = req.user?.currentInstituteNumber;
  const {
    teacherName,
    teacherEmail,
    teacherPhoneNumber,
    teacherExpertise,
    teacherSalary,
    teacherJoinedDate,
    courseId,
  } = req.body;

  const teacherPhoto = req.file
    ? req.file.path
    : "https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg";

  if (
    !teacherName ||
    !teacherEmail ||
    !teacherPhoneNumber ||
    !teacherExpertise ||
    !teacherSalary ||
    !teacherJoinedDate
  ) {
    return res.status(400).json({
      message:
        "Please provide teacherName, teacherEmail, teacherPhoneNumber, teacherExpertise, teacherSalary, teacherJoinedDate",
    });
  }

  // Password generate function
  const data = generateRandomPassword(teacherName);

  const insertedData = await sequelize.query(
    `INSERT INTO teacher_${instituteNumber}(teacherName, teacherEmail, teacherPhoneNumber, teacherExpertise, teacherJoinedDate, teacherSalary, teacherPhoto,courseId, teacherPassword) VALUES(?,?,?,?,?,?,?,?,?)`,
    {
      type: QueryTypes.INSERT,
      replacements: [
        teacherName,
        teacherEmail,
        teacherPhoneNumber,
        teacherExpertise,
        teacherJoinedDate,
        teacherSalary,
        teacherPhoto,
        courseId,
        data.hashedVersion,
      ],
    }
  );

  const teacherData: { id: string }[] = await sequelize.query(
    `SELECT id FROM teacher_${instituteNumber} WHERE teacherEmail=?`,
    {
      type: QueryTypes.SELECT,
      replacements: [teacherEmail],
    }
  );

  await sequelize.query(
    `UPDATE course_${instituteNumber} SET teacherId=? WHERE id=?`,
    {
      type: QueryTypes.UPDATE,
      replacements: [teacherData[0].id, courseId],
    }
  );
  const mailInformation ={
    to:teacherEmail,
    subject:"well com to our institute",
     text: `your email is :${teacherEmail} and password is :${data.plainVersion} and this is your institute number :${instituteNumber}`
  }
  await sendMail(mailInformation)
  res.status(200).json({
    message:" teacher created sursessfully",
    institutenum:instituteNumber
    

  })
};


const getTeachers = async(req:IExtendedRequest,res:Response)=>{
 const instituteNumber =req.user?.currentInstituteNumber
 
   const teachers= await sequelize.query(`SELECT * FROM teacher_${instituteNumber} `,{
    type:QueryTypes.SELECT
   })
   res.status(200).json({
    message:"teacher fetched",data:teachers
   })

}
const deleteTeacher=async(req:IExtendedRequest,res:Response)=>{
  const instituteNumber = req.user?.currentInstituteNumber;
const id =req.params.id
await sequelize.query(`DELETE FROM teacher_${instituteNumber} WHERE id =?`,{
  type:QueryTypes.DELETE,
  replacements:[id]
})
res.status(200).json({
  message :"teacher deleted"
})
}




export { createTeacher,getTeachers,deleteTeacher };
