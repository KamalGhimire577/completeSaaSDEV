// app.ts
import express from 'express';

const app = express();


import instituteRoute from "./route/institute/instituteRoute"; // ✅ file path must match

import authRoute from "./route/globals/auth/authRoute";
import courseRoute from "./route/institute/course/courseRoute";
import catagoryRoute from "./route/institute/category/categoryRoute"
import teacherinstituteRoute from "./route/institute/teacher/teacherRoute"
import studentRoute from "./route/institute/student/studentRoute"
import teacherRoute from "./route/teacher/teacherRoute"
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// globals route
app.use("/api", authRoute);
// institute route

app.use("/api/institute", instituteRoute); // ✅ this is your missing fix
app.use("/api/institute/course",courseRoute);
app.use("/api/institute/category",catagoryRoute)
app.use("/api/institute/teacher", teacherinstituteRoute);
app.use("/api/institute/student", studentRoute);


// teacher route
app.use("api/teacher",teacherRoute)
export default app;
