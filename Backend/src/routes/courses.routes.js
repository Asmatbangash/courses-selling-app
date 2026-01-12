import express from "express";
import { createCourse, getAllCourse, updateCourse, deleteCourse, courseDetail, buyCourses } from "../controllers/courses.controllers.js";
import userMiddlware from "../middlewares/user.middlware.js";
import adminMiddlware from "../middlewares/admin.middlware.js";
const courseRoute = express.Router()

courseRoute.route('/create').post(adminMiddlware,createCourse)
courseRoute.route('/get').get(getAllCourse)
courseRoute.route('/update/:id').patch(adminMiddlware,updateCourse)
courseRoute.route('/delete/:id').delete(adminMiddlware,deleteCourse)
courseRoute.route('/get/:id').get(courseDetail)

courseRoute.route("/buy/:courseId").post(userMiddlware, buyCourses)

export { courseRoute }