import express from "express";
import { createCourse, getAllCourse, updateCourse, deleteCourse, courseDetail } from "../controllers/courses.controllers.js";
const CourseRouter = express.Router()

CourseRouter.route('/create').post(createCourse)
CourseRouter.route('/get').get(getAllCourse)
CourseRouter.route('/update/:id').patch(updateCourse)
CourseRouter.route('/delete/:id').delete(deleteCourse)
CourseRouter.route('/get/:id').get(courseDetail)

export { CourseRouter }