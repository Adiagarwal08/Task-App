import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import taskRouter from "./routes/task.js";
import userRouter from "./routes/user.js";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/tasks", taskRouter);
app.use("/api/user", userRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to mongoDB:", error.message);
  });
