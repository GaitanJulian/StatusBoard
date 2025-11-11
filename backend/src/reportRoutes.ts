import { Router } from "express";
import { createReport, getAllReports, updateReportStatus } from "./reportStore";
import { ReportStatus } from "./types";

const router = Router();

// GET /reports - list all reports
router.get("/", (req, res) => {
  const reports = getAllReports();
  res.json(reports);
});

// POST /reports - create new report
router.post("/", (req, res) => {
  const { service, title, description } = req.body;

  if (!service || !title || !description) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const report = createReport({ service, title, description });
  res.status(201).json(report);
});

// PUT /reports/:id/status - update status
router.put("/:id/status", (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body as { status?: ReportStatus };

  if (!status || !["OPEN", "INVESTIGATING", "RESOLVED"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const updated = updateReportStatus(id, status as ReportStatus);

  if (!updated) {
    return res.status(404).json({ message: "Report not found" });
  }

  res.json(updated);
});

export default router;
