import express from 'express'
import { logIn, logOut, signUp } from '../controllers/user.controllers.js'


const userRouter = express.Router()

userRouter.route("/signUp").post(signUp)
userRouter.route("/login").post(logIn)
userRouter.route("/logOut").get(logOut)


export { userRouter }