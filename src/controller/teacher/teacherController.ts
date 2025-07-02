import { Request, Response } from "express";
import sequelize from "../../database/connection";
import { QueryTypes } from "sequelize";
import bcrypt from "bcrypt"
import { Jwt } from "jsonwebtoken";
import generateJWTToken from "../../services/generateJwtToken";
interface ITeacherData{
    teacherPassword :string
    id :string
}


const teacherLogin = async(req:Request,res:Response)=>{
    const {teacherEmail,teacherPassword,teacherinstituteNumber}=req.body
    if (!teacherEmail||!teacherPassword|| !teacherinstituteNumber){
        res.status(400).json({
            message :"please provide all information "
        })
        return
    }
      // jati dherai vector hunca teti nai sahaj hunxa query garna
      const teacherData:ITeacherData[] = await sequelize.query(  // iteacherDta jun aaray ma aauxa
        `SELECT * FROM  teacher_${teacherinstituteNumber} WHERE teacherEmail = ? `,
        {
          type: QueryTypes.SELECT,
          replacements: [teacherEmail],
        }
         );
        // aaraay return garnxa yesle
      if(teacherData.length==0){
        return res.status(404).json({
            message:"Invalid credentials"

        })
    }

   const isPasswordMatch=   bcrypt.compareSync(teacherPassword,teacherData[0].teacherPassword)
   if (!isPasswordMatch) {
     res.status(400).json({
       message: "Invalid credentials!!!!",
     });
    }else{
     const token = generateJWTToken({
       id: teacherData[0].id,
       instituteNumber: teacherinstituteNumber,
     });
     res.status(200).json({
       message: "teacher logged in",
       token,
     });
   }

}
export {teacherLogin}