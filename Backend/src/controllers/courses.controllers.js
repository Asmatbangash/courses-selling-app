import { coursesdb } from "../models/courses.model.js"
import { v2 as cloudinary } from "cloudinary";
// create course
const createCourse = async (req, res) => {
    try {
        const { title, description, price } = req.body;

        if (!title || !description || !price) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const image = req.files?.image;
        if (!image) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const allowedFormats = ["image/png", "image/jpeg"];
        if (!allowedFormats.includes(image.mimetype)) {
            return res.status(400).json({ error: "Only PNG and JPEG formats are allowed" });
        }

        // Upload to Cloudinary
        const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);
        console.log("Cloudinary response ✅:", cloud_response);

        if (!cloud_response || cloud_response.error) {
            return res.status(400).json({ error: "Error uploading image to Cloudinary" });
        }


        const courseData = {
            title,
            description,
            price,
            image: {
                public_id: cloud_response.public_id,
                url: cloud_response.secure_url,
            },
        };

        const course = await coursesdb.create(courseData);

        res.status(200).json({ message: "Course created successfully", course });

    } catch (error) {
        console.error("❌ Error creating course:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};



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