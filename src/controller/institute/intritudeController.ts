import { NextFunction, Request, Response } from "express";
import sequelize from "../../database/connection";
import generateRandomInsituteNumber from "../../services/genereteRandomIstituteNumber";
import { IExtendedRequest } from "../../middleware/type";
import User from "../../database/models/userModel";
//import categories from "../../seed";

// ---------------------- CREATE INSTITUTE ----------------------
const createInstitute = async (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const {
    instituteName,
    instituteEmail,
    institutePhoneNumber,
    instituteAddress,
    instituteVatNo = null,
    institutePanNo = null,
  } = req.body;

  if (
    !instituteName ||
    !instituteEmail ||
    !institutePhoneNumber ||
    !instituteAddress
  ) {
    return res.status(400).json({
      message:
        "Please provide instituteName, instituteEmail, institutePhoneNumber, and instituteAddress.",
    });
  }

  const instituteNumber = generateRandomInsituteNumber();

  // Create institute-specific table
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS institute_${instituteNumber} (
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      instituteName VARCHAR(255) NOT NULL,
      instituteEmail VARCHAR(255) NOT NULL,
      institutePhoneNumber VARCHAR(255) NOT NULL,
      instituteAddress VARCHAR(255) NOT NULL,
      institutePanNo VARCHAR(255),
      instituteVatNo VARCHAR(255),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await sequelize.query(
    `INSERT INTO institute_${instituteNumber}(instituteName, instituteEmail, institutePhoneNumber, instituteAddress, institutePanNo, instituteVatNo)
     VALUES (?, ?, ?, ?, ?, ?)`,
    {
      replacements: [
        instituteName,
        instituteEmail,
        institutePhoneNumber,
        instituteAddress,
        institutePanNo,
        instituteVatNo,
      ],
    }
  );

  // Create history table if not exists
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS user_institute (
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      userId VARCHAR(255) REFERENCES users(id),
      instituteNumber INT UNIQUE
    )
  `);

  // Store reference in user_institute and update user role
  if (req.user) {
    await sequelize.query(
      `INSERT INTO user_institute(userId, instituteNumber) VALUES (?, ?)`,
      {
        replacements: [req.user.id, instituteNumber],
      }
    );

    await User.update(
      {
        currentInstituteNumber: instituteNumber,
        role: "institute",
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );
  }

  // Store for next middleware
  res.locals.instituteNumber = instituteNumber;
  next();
};

// ---------------------- CREATE TEACHER TABLE ----------------------
const createTeacherTable = async (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const instituteNumber =
      res.locals.instituteNumber || req.user?.currentInstituteNumber;

    if (!instituteNumber) {
      return res.status(400).json({
        message: "Institute number missing for teacher table creation.",
      });
    }

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS teacher_${instituteNumber} (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        teacherName VARCHAR(255) NOT NULL,
        teacherEmail VARCHAR(255) NOT NULL UNIQUE,
        teacherPhoneNumber VARCHAR(255) NOT NULL UNIQUE,
        teacherExpertise VARCHAR(255),
        joinedDate DATE,
        salary VARCHAR(100),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    next();
  } catch (error) {
    console.error("Error creating teacher table:", error);
    res.status(500).json({ message: "Failed to create teacher table." });
  }
};

// ---------------------- CREATE STUDENT TABLE ----------------------
const createStudentTable = async (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const instituteNumber =
      res.locals.instituteNumber || req.user?.currentInstituteNumber;

    if (!instituteNumber) {
      return res.status(400).json({
        message: "Institute number missing for student table creation.",
      });
    }

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS student_${instituteNumber} (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        studentName VARCHAR(255) NOT NULL,
        studentPhoneNo VARCHAR(255) NOT NULL UNIQUE,
        studentAddress TEXT,
        enrolledDate DATE,
        studentImage VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    next();
  } catch (error) {
    console.error("Error creating student table:", error);
    res.status(500).json({ message: "Failed to create student table." });
  }
};

// ---------------------- CREATE COURSE TABLE ----------------------
const createCourseTable = async (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const instituteNumber =
      res.locals.instituteNumber || req.user?.currentInstituteNumber;

    if (!instituteNumber) {
      return res.status(400).json({
        message: "Institute number missing for course table creation.",
      });
    }

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS course_${instituteNumber} (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        courseName VARCHAR(255) NOT NULL UNIQUE,
        coursePrice VARCHAR(255) NOT NULL,
        courseDuration VARCHAR(100) NOT NULL,
        courseLevel ENUM('beginner', 'intermediate', 'advance') NOT NULL,
        courseThumbnail VARCHAR(200),
        courseDescription TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log(`✅ Course table for institute_${instituteNumber} created.`);
    next(); // Pass control to the next middleware/handler
  } catch (error) {
    console.error("❌ Error creating course table:", error);
    res.status(500).json({
      message: "Failed to create course table.",
    });
  }
};
// ---------------------- CREATE CATEGORY TABLE ----------------------
const createCategoryTable = async (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const instituteNumber =
    res.locals.instituteNumber || req.user?.currentInstituteNumber;

  if (!instituteNumber) {
    return res
      .status(400)
      .json({
        message: "Institute number missing for category table creation.",
      });
  }

  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS category_${instituteNumber} (
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      categoryName VARCHAR(100) NOT NULL,
      categoryDescription TEXT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // for (const category of categories) {
  //   await sequelize.query(
  //     `INSERT INTO category_${instituteNumber}(categoryName, categoryDescription) VALUES (?, ?)`,
  //     {
  //       replacements: [category.categoryName, category.categoryDescription],
  //     }
  //   );
  // }

  // next();
};

export {
  createInstitute,
  createTeacherTable,
  createStudentTable,
  createCourseTable,
  createCategoryTable,
};
