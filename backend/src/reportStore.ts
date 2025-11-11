import type { ReportStatus } from "./types";
import prisma from "./prisma";

export async function getAllReports(filters?: any) {
  const where: any = {};

  if (filters?.status) where.status = filters.status;
  if (filters?.service) where.service = { contains: filters.service, mode: "insensitive" };

  return prisma.report.findMany({
    where,
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
