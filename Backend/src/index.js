import express from "express";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import { connectDb } from "./db/db.connection.js";
import { router } from "./routes/courses.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

// File upload middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

connectDb();

// Test route
app.get("/", (req, res) => {
  res.send("Hello Node!");
});

// Routes
app.use("/api/v1/course", router);

// Start server
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
