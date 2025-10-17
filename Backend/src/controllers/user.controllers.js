import { users } from "../models/user.model.js"
import bcrypt from 'bcryptjs'

const signIn = async (req, res) => {
    const { FullName, email, password } = req.body

    try {
        if (!FullName || !email || !password) {
            return res.status(400).json({ message: "all fields are required" })
        }

        const userExist = await users.findOne({ email })

        if (userExist) {
            return res.status(401).json({ message: "user already exist" })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const user = await users.create({
            FullName,
            email,
            password: hashPassword
        })

        res.status(200).json({ message: "user created successfully!", user })

    } catch (error) {
        return res.status(400).json({ message: "error to creating user" })
    }
}

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


export { signIn, logIn }