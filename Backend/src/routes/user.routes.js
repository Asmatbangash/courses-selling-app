import express from 'express'
import { logIn, signIn } from '../controllers/user.controllers.js'


const userRouter = express.Router()

userRouter.route("/signIn").post(signIn)
userRouter.route("/login").post(logIn)




export { userRouter }