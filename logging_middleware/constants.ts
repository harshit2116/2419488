import dotenv from "dotenv";

dotenv.config();

export const LOG_API =
  "http://4.224.186.213/evaluation-service/logs";

export const ACCESS_TOKEN =
  process.env.ACCESS_TOKEN || "";