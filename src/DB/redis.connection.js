import { createClient } from "redis";
import { REDIS_URL } from "../config/config.js";

export const client = createClient({
  url: REDIS_URL,
});

client.on("error", (err) => console.log("Redis Client Error", err));

export async function redisConnection() {
  try {
    await client.connect();
    console.log("Redis Connected ");
  } catch (error) {
    console.log("Redis Connection Failed");
    console.log(error);
  }
}
