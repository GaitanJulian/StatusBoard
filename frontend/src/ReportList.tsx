import type { Report, ReportStatus } from "./types";
import { updateReportStatus } from "./api";

interface Props {
  reports: Report[];
  onUpdate: (report: Report) => void;
}

function statusClass(status: ReportStatus): string {
  if (status === "OPEN") return "badge badge-open";
  if (status === "INVESTIGATING") return "badge badge-investigating";
  return "badge badge-resolved";
}

function ReportList({ reports, onUpdate }: Props) {
  async function handleChangeStatus(id: number, status: ReportStatus) {
    const updated = await updateReportStatus(id, status);
    onUpdate(updated);
  }

  if (reports.length === 0) {
    return (
      <div className="card">
        <p className="small">No reports yet. Create one to simulate an incident.</p>
      </div>
    );
  }

  return (
    <>
      {reports.map((r) => (
        <div key={r.id} className="card">
          <div>
            <span className={statusClass(r.status)}>{r.status}</span>
            <span className="badge">{r.service}</span>
          </div>
          <h3>{r.title}</h3>
          <p>{r.description}</p>
          <p className="small">
            Created: {new Date(r.createdAt).toLocaleString()} | Updated:{" "}
            {new Date(r.updatedAt).toLocaleString()}
          </p>
          <div>
            <button
              onClick={() => handleChangeStatus(r.id, "OPEN")}
              disabled={r.status === "OPEN"}
            >
              Mark OPEN
            </button>
            <button
              onClick={() => handleChangeStatus(r.id, "INVESTIGATING")}
              disabled={r.status === "INVESTIGATING"}
            >
              Mark INVESTIGATING
            </button>
            <button
              onClick={() => handleChangeStatus(r.id, "RESOLVED")}
              disabled={r.status === "RESOLVED"}
            >
              Mark RESOLVED
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default ReportList;
