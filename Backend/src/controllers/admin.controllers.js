import { Admin } from "../models/admin.model.js";
import bcrypt from 'bcryptjs'
import { z } from "zod";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import config from "../config.js";

dotenv.config()

const signUp = async (req, res) => {
    const { FullName, email, password } = req.body;

    const schema = z.object({
        FullName: z.string().min(2, { message: "FullName must be at least 2 characters" }),
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    });

    try {
        const zodeValidation = schema.safeParse(req.body);

        if (!zodeValidation.success) {
            return res.status(400).json({ errors: zodeValidation.error.issues.map((err) => err.message) })
        }

        const adminExist = await Admin.findOne({ email });
        if (adminExist) {
            return res.status(401).json({ message: "admin already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const admin = await Admin.create({
            FullName,
            email,
            password: hashPassword,
        });

        res.status(200).json({ message: "admin created successfully!", admin });
    } catch (error) {
        if (error.errors) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        return res.status(400).json({ message: "Error creating admin", error: error.message });
    }
};

const logIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "admin not found" });
        }


        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // jwt 
        const token = jwt.sign({
            id: admin._id
        }, config.JWT_ADMIN_PASSWORD,
     {
        expiresIn: "1d"
     }
    )

    const cokieOptions = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
        httpOnly: true,
        secure: process.env.NODE_ENV ==="production",
        sameSite: "Strict"
    }

        res.cookie("jwt", token, cokieOptions)
        res.status(201).json({
            message: "Login successful",
            admin,
            token
        });


    } catch (error) {
        return res.status(400).json({ message: "there are some server side error in login" })
    }

}

const logOut = async (req, res) => {
    try {
        if(!req.cookies.jwt){
            return res.status(401).json({errors: "please first login."}) 
        }
        res.clearCookie("jwt")
        res.status(200).json({ message: "admin logOut successfully!" })
    } catch (error) {
        return res.status(500).json({ message: "there some error in logOut", error })
    }
}

export {
    signUp,
    logIn,
    logOut
}