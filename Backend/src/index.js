import express from "express";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import { connectDb } from "./db/db.connection.js";
import { courseRoute } from "./routes/courses.routes.js";
import { userRoute } from './routes/user.routes.js'
import { adminRoute } from "./routes/admin.routes.js";
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials:true,
  methods: ["GET","PUT","PATCH","POST","DELETE"],
  allowedHeaders:["Content-Type", "Authorization"],
  preflightContinue: false,
  optionsSuccessStatus: 204
}))

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

connectDb();

app.use("/api/v1/course", courseRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
