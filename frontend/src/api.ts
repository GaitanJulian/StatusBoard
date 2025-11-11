import type { Report, ReportStatus } from "./types";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export async function fetchReports(): Promise<Report[]> {
  const res = await fetch(`${API_BASE}/reports`);
  if (!res.ok) throw new Error("Failed to fetch reports");
  return res.json();
}

export async function createReport(input: {
  service: string;
  title: string;
  description: string;
}): Promise<Report> {
  const res = await fetch(`${API_BASE}/reports`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Failed to create report");
  return res.json();
}

export async function updateReportStatus(
  id: number,
  status: ReportStatus
): Promise<Report> {
  const res = await fetch(`${API_BASE}/reports/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update status");
  return res.json();
}
