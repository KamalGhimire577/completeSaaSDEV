import { Request, Response } from "express";
import User from "../../../database/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
class AuthController {
  // static method for registration
  static async registerUser(req: Request, res: Response) {
    if (!req.body || req.body === undefined) {
      res.status(400).json({
        message: "No data was sent!!",
      });
      return;
    }

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    // Hash the password before saving (recommended)
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    res.status(200).json({ message: "User registered successfully" });
  }

  // loginUser function (non-static)
  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: "Please provide email and password",
      });
      return;
    }

    // Find user by email
    const data = await User.findAll({ where: { email } });

    if (data.length == 0) {
      res.status(404).json({
        message: "User not registered",
      });
      
    }
    else {
      // check password
      // compaire (plane password user given , database ko hash password)
      const isPassWordMatch = bcrypt.compareSync(password, data[0].password);

      if (isPassWordMatch) {
      /// login vaayo tokan gen garnu paryo
        
     const token = jwt.sign({id : data[0].id},"thisissecrethai",{
      expiresIn : "10d"
     })
     res.json({
      token :token
     })

      }
      else{
        res.status(403).json ({
          massage: "Invalid email or password"
        })
      }
    }
    // const user = data[0];

    // // Compare password
    // const match = await bcrypt.compare(password, user.password);
    // if (!match) {
    //   res.status(401).json({
    //     message: "Incorrect password",
    //   });
    //   return;
    // }

    // Login successful
    // res.status(200).json({
    //   message: "Login successful",
    //   user: {
    //     id: user.id,
    //     username: user.username,
    //     email: user.email,
    //     role: user.role,
    //   },
   
  }
}

export default AuthController;
