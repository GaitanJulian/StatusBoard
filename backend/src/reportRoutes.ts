import { Router } from "express";
import { createReport, getAllReports, updateReportStatus } from "./reportStore";
import type { ReportStatus } from "./types";
import { asyncHandler } from "./asyncHandler";
import { verifyAdminToken } from "./auth";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const reports = await getAllReports();
    res.json(reports);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { service, title, description } = req.body;

    if (!service || !title || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const report = await createReport({ service, title, description });
    res.status(201).json(report);
  })
);

// Solo admins pueden cambiar estado
router.put(
  "/:id/status",
  verifyAdminToken,
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const { status } = req.body as { status?: ReportStatus };

    if (!status || !["OPEN", "INVESTIGATING", "RESOLVED"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updated = await updateReportStatus(id, status as ReportStatus);
    if (!updated) return res.status(404).json({ message: "Report not found" });

    res.json(updated);
  })
);

export default router;
