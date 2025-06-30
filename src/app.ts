// app.ts
import express from 'express';

const app = express();


import instituteRoute from "./route/institute/instituteRoute"; // ✅ file path must match

import authRoute from "./route/globals/auth/authRoute";
import courseRoute from "./route/institute/course/courseRoute";
import catagoryRoute from "./route/institute/category/categoryRoute"

//app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/api", authRoute);
app.use("/api/institute", instituteRoute); // ✅ this is your missing fix
app.use("/api/institute/course",courseRoute);
app.use("/api/institute/category",catagoryRoute)
export default app;
