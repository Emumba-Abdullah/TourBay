import dotenv from "dotenv";
import express from "express";
import { connect_database } from "./utils/connect_db";
import userRouter from "./routes/userRouter";
import tourRouter from "./routes/tourRouter";
import bookingRouter from "./routes/bookingRouter";
dotenv.config();

const app = express();

app.use(express.json());
app.use("/user", userRouter);
app.use("/tour", tourRouter);
app.use("/booking", bookingRouter);

connect_database();

app.listen(3000, () => {
  console.log("listening on port 3000");
});
