import express from "express";
import { createCourse, getAllCourse, updateCourse, deleteCourse } from "../controllers/courses.controllers.js";

const router = express.Router()

router.post('/create', createCourse)
router.get('/get', getAllCourse)
router.patch('/update/:id', updateCourse)
router.delete('/delete/:id', deleteCourse)

export { router }