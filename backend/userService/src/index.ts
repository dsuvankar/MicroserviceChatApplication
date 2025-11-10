import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import { createClient } from "redis";

dotenv.config();
connectDb();

const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
  console.error("REDIS_URL environment variable is not set");
  process.exit(1);
}

export const redisClient = createClient({
  url: redisUrl,
});

redisClient
  .connect()
  .then(() => console.log("connected to redis"))
  .catch(console.error);

const app = express();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
