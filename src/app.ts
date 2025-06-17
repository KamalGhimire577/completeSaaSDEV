import express from "express";
// import { config } from "dotenv";
// config()
const app = express();
import institudeRoute from "./route/institude/insttituteRoute"
import authRoute from "./route/globals/auth/authRoute";
app.use(express.json())// parser gareko
app.use("/api", authRoute);
app.use ("/api/institute",institudeRoute)
export default app;
