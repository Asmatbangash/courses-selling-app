import { users } from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import { z } from "zod";

const signUp = async (req, res) => {
    const { FullName, email, password } = req.body;

    const schema = z.object({
        FullName: z.string().min(2, { message: "FullName must be at least 2 characters" }),
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    });

    try {
        schema.parse({ FullName, email, password });

        const userExist = await users.findOne({ email });
        if (userExist) {
            return res.status(401).json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await users.create({
            FullName,
            email,
            password: hashPassword,
        });

        res.status(200).json({ message: "User created successfully!", user });
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
        console.log('hi')
        const user = await users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        });


    } catch (error) {
        return res.status(400).json({ message: "there are some server side error in login" })
    }

}


export { signUp, logIn }