import express from 'express'
import { logIn, signUp } from '../controllers/user.controllers.js'


const userRouter = express.Router()

userRouter.route("/signUp").post(signUp)
userRouter.route("/login").post(logIn)




export { userRouter }