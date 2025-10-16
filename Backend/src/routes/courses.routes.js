import express from "express";
import { createCourse, getAllCourse, updateCourse, deleteCourse } from "../controllers/courses.controllers.js";
const router = express.Router()

router.route('/create').post(createCourse)
router.route('/get').get(getAllCourse)
router.route('/update/:id').patch(updateCourse)
router.route('/delete/:id').delete(deleteCourse)

export { router }