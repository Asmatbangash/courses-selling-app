import express from "express";
import userMiddlware from "../middlewares/user.middlware.js";
import { payment } from "../controllers/paymentInfo.controller.js";

const paymentInfo = express.Router()


paymentInfo.route("/").post(userMiddlware, payment)

export { paymentInfo }