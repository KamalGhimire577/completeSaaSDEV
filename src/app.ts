// app.ts
import express from "express";
import { config } from "dotenv";
config();
import instituteRoute from "./route/institute/instituteRoute"; // ✅ file path must match

import authRoute from "./route/globals/auth/authRoute";
import courseRoute from "./route/institute/course/courseRoute";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api", authRoute);
app.use("/api/institute", instituteRoute); // ✅ this is your missing fix
app.use("/api/institute/course", courseRoute);

export default app;
