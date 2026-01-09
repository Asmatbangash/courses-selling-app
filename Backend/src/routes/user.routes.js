import express from 'express'
import { logIn, logOut, purchaseCourses, signUp } from '../controllers/user.controllers.js'
import userMiddlware from '../middlewares/user.middlware.js'


const userRouter = express.Router()

userRouter.route("/signUp").post(signUp)
userRouter.route("/login").post(logIn)
userRouter.route("/logOut").get(logOut)
userRouter.route("/purchaseCourses").get(userMiddlware,purchaseCourses)


export { userRouter }