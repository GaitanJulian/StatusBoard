export type ReportStatus = "OPEN" | "INVESTIGATING" | "RESOLVED";

export interface Report {
  id: number;
  service: string;
  title: string;
  description: string;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
}
