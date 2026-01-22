import { user } from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import { z } from "zod";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { purchase } from "../models/purchase.model.js";
import { course } from "../models/courses.model.js";
import config from "../config.js";

dotenv.config()

const signUp = async (req, res) => {
    const { FullName, email, password } = req.body;
    const schema = z.object({
        FullName: z.string().min(3, { message: "FullName must be at least 2 characters" }),
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    });

    try {
        const zodeValidation = schema.safeParse(req.body);

        if (!zodeValidation.success) {
            return res.status(400).json({ errors: zodeValidation.error.issues.map((err) => err.message) })
        }

        const userExist = await user.findOne({ email });
        if (userExist) {
            return res.status(401).json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const User = await user.create({
            FullName,
            email,
            password: hashPassword,
        });

        res.status(200).json({ message: "User created successfully!", User });
    } catch (error) {
        if (error.errors) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        return res.status(400).json({ message: "Error creating user", error: error.message });
    }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const User = await user.findOne({ email });
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: User._id },  
      config.JWT_USER_PASSWORD,
      { expiresIn: "1d" }
    );
    
    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    };

    res.cookie("jwt", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      User
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};


const logOut = async (req, res) => {
    try {
        if(!req.cookies.jwt){
            return res.status(401).json({errors: "please first login."}) 
        }
        res.clearCookie("jwt")
        res.status(200).json({ message: "user logOut successfully!" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "there some error in logOut", error })
    }
}

const purchaseCourses = async(req, res) =>{
 const userId = req.userId
 try {
  const purchased = await purchase.find({userId})

  if(!purchased) {
    return res.status(404).json({errors: "you have not purchase any course yet!"})
  }
  let purchasedCourseId = []

  for(let i=0; i < purchased.length; i++){
    purchasedCourseId.push(purchased[i].courseId)
  }

  const courseData = await course.find({
    _id: {$in: purchasedCourseId}
  })

  res.status(200).json({purchased, courseData})
    
 } catch (error) {
     console.log("Error to get purchaseCourses!", error)
    return res.status(401).json({errors: "Error to get purchaseCourses!"})
 }
}


export { signUp, logIn, logOut, purchaseCourses }