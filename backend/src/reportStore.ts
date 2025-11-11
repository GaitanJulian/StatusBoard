import type { ReportStatus } from "./types";
import prisma from "./prisma";

export async function getAllReports() {
  return prisma.report.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createReport(data: {
  service: string;
  title: string;
  description: string;
}) {
  return prisma.report.create({
    data: {
      service: data.service,
      title: data.title,
      description: data.description,
      // status defaults to "OPEN"
    },
  });
}

export async function updateReportStatus(id: number, status: ReportStatus) {
  const report = await prisma.report.findUnique({ where: { id } });
  if (!report) return null;

  return prisma.report.update({
    where: { id },
    data: { status },
  });
}
