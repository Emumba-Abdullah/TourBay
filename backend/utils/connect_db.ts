import mongoose from "mongoose";
export async function connect_database() {
  try {
    if (!process.env.DATABASE_URL) {
      console.error(
        "MongoDB connection string is not provided in environment variables."
      );
      process.exit(1);
    }
    const connection = await mongoose.connect(process.env.DATABASE_URL);
    if (connection) {
      console.log("database connected");
    }
  } catch (err) {
    console.log(err);
  }
}
