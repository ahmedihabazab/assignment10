import mongoose from "mongoose";
import { DBURI } from "../config/config.js";
import { redisConnection } from "./redis.connection.js";

export async function dbConnection() {
  try {
    await mongoose.connect(DBURI);
    console.log("DB connected");
    await redisConnection();
  } catch (error) {
    console.log("Connection Failed");
    console.log(error);
  }
}
