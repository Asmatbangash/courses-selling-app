import express from 'express'
import { logIn, logOut, signUp } from '../controllers/admin.controllers.js'


const adminRoute = express.Router()

adminRoute.route("/signUp").post(signUp)
adminRoute.route("/login").post(logIn)
adminRoute.route("/logOut").get(logOut)


export { adminRoute }