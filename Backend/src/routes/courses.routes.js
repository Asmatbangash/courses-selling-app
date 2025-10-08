import express from "express";
import { createCourse, getAllCourse } from "../controllers/courses.controllers.js";

const router = express.Router()

router.post('/Course', createCourse)
router.get('/Courses', getAllCourse )


export {router}