import express from 'express'
import { logIn, logOut, purchaseCourses, signUp } from '../controllers/user.controllers.js'
import userMiddlware from '../middlewares/user.middlware.js'


const userRoute = express.Router()

userRoute.route("/signUp").post(signUp)
userRoute.route("/login").post(logIn)
userRoute.route("/logOut").get(logOut)
userRoute.route("/purchaseCourses").get(userMiddlware,purchaseCourses)


export { userRoute }