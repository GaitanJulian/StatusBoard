import { config } from "./config";

type LogLevel = "info" | "warn" | "error";

function log(level: LogLevel, message: string, meta?: unknown) {
  const entry = {
    level,
    message,
    meta,
    env: config.env,
    timestamp: new Date().toISOString(),
  };

  if (level === "error") {
    console.error(JSON.stringify(entry));
  } else {
    console.log(JSON.stringify(entry));
  }
}

export const logger = {
  info: (msg: string, meta?: unknown) => log("info", msg, meta),
  warn: (msg: string, meta?: unknown) => log("warn", msg, meta),
  error: (msg: string, meta?: unknown) => log("error", msg, meta),
};
