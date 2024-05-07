import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import { connect_database } from "./utils/connect_db";
import userRouter from "./routes/userRouter";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/user", userRouter);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

connect_database();

app.listen(3000, () => {
  console.log("listening on port 3000");
});
