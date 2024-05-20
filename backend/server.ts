import dotenv from "dotenv";
import express from "express";
import { connect_database } from "./utils/connect_db";
import userRouter from "./routes/userRouter";
import tourRouter from "./routes/tourRouter";
import bookingRouter from "./routes/bookingRouter";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: "GET, POST, PUT, DELETE", // Allow specified HTTP methods
    credentials: true, // Enable sending cookies in cross-origin requests
  })
);

app.use(express.json());
app.use("/user", userRouter);
app.use("/tour", tourRouter);
app.use("/booking", bookingRouter);

connect_database();

app.listen(3000, () => {
  console.log("listening on port 3000");
});
