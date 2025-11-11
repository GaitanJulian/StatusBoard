import { Report, ReportStatus } from "./types";

let reports: Report[] = [];
let nextId = 1;

export function getAllReports(): Report[] {
  return reports;
}

export function createReport(data: {
  service: string;
  title: string;
  description: string;
}): Report {
  const now = new Date().toISOString();

  const newReport: Report = {
    id: nextId++,
    service: data.service,
    title: data.title,
    description: data.description,
    status: "OPEN",
    createdAt: now,
    updatedAt: now,
  };

  reports.push(newReport);
  return newReport;
}

export function updateReportStatus(
  id: number,
  status: ReportStatus
): Report | null {
  const report = reports.find((r) => r.id === id);
  if (!report) return null;

  report.status = status;
  report.updatedAt = new Date().toISOString();
  return report;
}
