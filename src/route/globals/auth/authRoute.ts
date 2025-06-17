import express, { Router } from "express";
import AuthController from "../../../controller/globals/auth/authController";

const router: Router = express.Router();

// Using static method directly
router.route("/register").post(AuthController.registerUser);
router.route("/login").post(AuthController.loginUser);



export default router;
