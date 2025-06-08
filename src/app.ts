import express from "express";
const app = express();
import authRoute from "./route/globals/auth/authRoute";
app.use(express.json())// parser gareko
app.use("/api", authRoute);
export default app;
