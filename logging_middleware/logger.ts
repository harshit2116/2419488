import axios from "axios";
import {
  ACCESS_TOKEN,
  LOG_API,
} from "./constants";

import {
  StackType,
  LogLevel,
  PackageType,
} from "./types";

export async function log(
  stack: StackType,
  level: LogLevel,
  packageName: PackageType,
  message: string
) {
  try {
    const response = await axios.post(
      LOG_API,
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization:
            `Bearer ${ACCESS_TOKEN}`,
          "Content-Type":
            "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Logging failed:",
      error?.response?.data || error.message
    );

    throw error;
  }
}