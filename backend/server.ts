import dotenv from "dotenv";
import express from "express";
import { connect_database } from "./utils/connect_db";

dotenv.config();

const app = express();

app.use(express.json());

connect_database();

app.listen(3000, () => {
  console.log("listening on port 3000");
});
