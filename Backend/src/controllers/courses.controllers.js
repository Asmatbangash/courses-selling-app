import { course } from "../models/courses.model.js"
import { v2 as cloudinary } from "cloudinary";
import { purchase } from "../models/purchase.model.js";
import dotenv from 'dotenv'

dotenv.config()


// create course
const createCourse = async (req, res) => {
    const adminId = req.adminId
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

        if (!cloud_response || cloud_response.error) {
            return res.status(400).json({ error: "Error uploading image to Cloudinary" });
        }


        const courseData = {
            title,
            description,
            price,
            image: {
                public_id: cloud_response.public_id,
                url: cloud_response.url,
            },
            creatorId: adminId
        };

        const Course = await course.create(courseData);

        res.status(200).json({ message: "Course created successfully", Course });

    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

// get all course
const getAllCourse = async (req, res) => {
    try {
        const getCourses = await course.find()
        res.status(200).json({ message: "all courses get succesfully!", getCourses })
    } catch (error) {
        console.log(error)
    }
}

// update course
const updateCourse = async (req, res) => {
    const adminId = req.adminId
    try {
        const { id } = req.params;
        const { title, description, price } = req.body;

        const image = req.files?.image;
        if (!image) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const allowedFormats = ["image/png", "image/jpeg"];
        if (!allowedFormats.includes(image.mimetype)) {
            return res.status(400).json({ error: "Only PNG and JPEG formats are allowed" });
        }

        // ✅ Upload to Cloudinary
        const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);

        if (!cloud_response || cloud_response.error) {
            return res.status(400).json({ error: "Error uploading image to Cloudinary" });
        }

        // ✅ Use `cloud_response` instead of `image`
        const updateCourseData = await course.findByIdAndUpdate(
            id,
            {
                title,
                description,
                price,
                image: {
                    public_id: cloud_response.public_id,
                    url: cloud_response.secure_url
                },
                creatorId: adminId
            },
            { new: true }
        );

        if (!updateCourseData) {
            return res.status(404).json({ message: "Course not found!" });
        }

        res.status(200).json({
            message: "Course data updated successfully.",
            updateCourseData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// delete course
const deleteCourse = async (req, res) => {
  const adminId = req.adminId
    try {
        const { id } = req.params
        const Course  = await course.findByIdAndDelete(id, {creatorId: adminId})
 
        if(!Course){
            return res.status(404).json({errors: "course not found!" })
        }

        res.status(200).json({
            message: "course deleted successfully!"
        })
    } catch (error) {
        console.log(error)
    }
}

// course detail
const courseDetail = async (req, res) => {
    try {
        const { id } = req.params
        const detailCoursView = await course.findByIdAndDelete(id)
        if (!detailCoursView) {
            res.status(400).json({ message: "course not found" })
        }
        res.status(200).json({
            message: "course detail viewed successfully!",
            detailCoursView
        })
    } catch (error) {
        console.log(error)
    }
}


// buy courses
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const buyCourses = async (req, res) => {
  try {
    const userId = req.userId;
    const { courseId } = req.params;

    const courseData = await course.findById(courseId);
    if (!courseData) {
      return res.status(404).json({ message: "Course not found" });
    }

    const existPurchase = await purchase.findOne({ userId, courseId });
    if (existPurchase) {
      return res.status(400).json({ message: "You already purchased this course" });
    }
    //Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: courseData.price * 100, 
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        userId,
        courseId,
      },
    });

    res.status(200).json({
      message: "course purchased successfully!",
      clientSecret: paymentIntent.client_secret,
      courseData,
    });

  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
};






export {
    createCourse,
    getAllCourse,
    updateCourse,
    deleteCourse,
    courseDetail,
    buyCourses
}