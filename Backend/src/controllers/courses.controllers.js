import { coursesdb } from "../models/courses.model.js"

// create course
const createCourse = async (req, res) => {
    try {
        const { title, description, price, image } = req.body
        if (!title || !description || !price || !image) {
            return res.status(400).json({ errors: "All feild are require" })
        }

        const courseData = {
            title,
            description,
            price,
            image
        }

        const course = await coursesdb.create(courseData)
        res.status(200).json({ message: "course create successfully", course })
    } catch (error) {
        console.log(error)
    }
}

// get all course
const getAllCourse = async (req, res) => {
    try {
        const getCourses = await coursesdb.find()
        res.status(200).json({ message: "all courses get succesfully!", getCourses })
    } catch (error) {
        console.log(error)
    }
}

// update course
const updateCourse = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, price, image } = req.body

        const updateCourseData = await coursesdb.findByIdAndUpdate(id, { title, description, price, image }, { new: true })

        res.status(200).json({
            message: "course data updated successfully.",
            updateCourseData
        })
    } catch (error) {
        console.log(error)
    }
}

// delete course
const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params
        await coursesdb.findByIdAndDelete(id)
        res.status(200).json({
            message: "course deleted successfully!"
        })
    } catch (error) {
        console.log(error)
    }
}




export {
    createCourse,
    getAllCourse,
    updateCourse,
    deleteCourse
}