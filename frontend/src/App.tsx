import { useEffect, useState } from "react";
import { fetchReports } from "./api";
import type { Report } from "./types";
import ReportForm from "./ReportForm";
import ReportList from "./ReportList";

function App() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchReports();
        setReports(data);
      } catch (err) {
        setError("Failed to load reports.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function handleCreated(report: Report) {
    setReports((prev) => [report, ...prev]);
  }

  function handleUpdated(updated: Report) {
    setReports((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  }

  return (
    <div className="app-container">
      <h1>StatusBoard</h1>
      <p className="subtitle">
        Incident and production support dashboard demo. Submit issues, track
        status changes, and simulate Level 3 support workflows.
      </p>

      <div className="section-title">Create Report</div>
      <ReportForm onCreated={handleCreated} />

      <div className="section-title">Active Reports</div>
      {loading && <p className="small">Loading reports...</p>}
      {error && <p className="small" style={{ color: "#f97316" }}>{error}</p>}
      {!loading && !error && (
        <ReportList reports={reports} onUpdate={handleUpdated} />
      )}
    </div>
  );
}

export default App;
