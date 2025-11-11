import { Router } from "express";
import { createReport, getAllReports, updateReportStatus } from "./reportStore";
import type { ReportStatus } from "./types";

const router = Router();

// GET /reports
router.get("/", async (req, res) => {
  const reports = await getAllReports();
  res.json(reports);
});

// POST /reports
router.post("/", async (req, res) => {
  const { service, title, description } = req.body;

  if (!service || !title || !description) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const report = await createReport({ service, title, description });
  res.status(201).json(report);
});

// PUT /reports/:id/status
router.put("/:id/status", async (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body as { status?: ReportStatus };

  if (!status || !["OPEN", "INVESTIGATING", "RESOLVED"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const updated = await updateReportStatus(id, status as ReportStatus);

  if (!updated) {
    return res.status(404).json({ message: "Report not found" });
  }

  res.json(updated);
});

export default router;
