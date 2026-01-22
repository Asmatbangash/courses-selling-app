import { paymentInfo } from "../models/paymentInfo.model.js";
import {purchase} from '../models/purchase.model.js'

const payment =async (req, res) =>{
  const payment = req.body;
  try {
    const payementInfoData = await paymentInfo.create(payment);
    console.log(payementInfoData);
    const userId = payementInfoData?.userId;
    const courseId = payementInfoData?.courseId;
    res.status(201).json({ message: "payment Details: ", payementInfoData });
    if (payementInfoData) {
      await purchase.create({ userId, courseId });
    }
  } catch (error) {
    console.log("Error in payment: ", error);
    res.status(401).json({ errors: "Error in payment creation" });
  }
}


export {
    payment
}