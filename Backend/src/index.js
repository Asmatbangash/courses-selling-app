import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/db.connection.js";
import { router } from "./routes/courses.routes.js";
const app = express();

dotenv.config();
const port = process.env.PORT || 4000;

app.use(express.json())


// database 
connectDb()


app.get("/", (req, res) => {
  res.send("Hello node");
});

// course routes
app.use("/api/v1/course", router)


app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
