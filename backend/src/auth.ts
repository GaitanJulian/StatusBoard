import type { Request, Response, NextFunction } from "express";

export function verifyAdminToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"] || req.headers["x-api-key"];

  if (!authHeader || authHeader !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
}
