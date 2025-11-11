import type { Request, Response, NextFunction } from "express";
import { logger } from "./logger";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error("unhandled_error", {
    path: req.path,
    method: req.method,
    error: err instanceof Error ? err.message : err,
  });

  res.status(500).json({ message: "Internal server error" });
}
