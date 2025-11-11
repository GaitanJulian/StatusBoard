import "dotenv/config";

export const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 4000,
  env: process.env.NODE_ENV || "development",
};
