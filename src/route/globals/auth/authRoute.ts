import express, { Router } from "express";
import AuthController from "../../../controller/globals/auth/authController";

const router: Router = express.Router();

// Using static method directly
router.route("/register").post(AuthController.registerUser);

export default router;
