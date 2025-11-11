import { useState } from "react";
import { createReport } from "./api";
import type { Report } from "./types";

interface Props {
  onCreated: (report: Report) => void;
}

function ReportForm({ onCreated }: Props) {
  const [service, setService] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!service || !title || !description) {
      setError("All fields are required.");
      return;
    }
    try {
      setLoading(true);
      const report = await createReport({ service, title, description });
      onCreated(report);
      setService("");
      setTitle("");
      setDescription("");
    } catch (err) {
      setError("Failed to create report.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h3>New Incident Report</h3>
      <p className="small">
        Use this form to simulate a user or support engineer reporting an issue.
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          Service
          <input
            value={service}
            onChange={(e) => setService(e.target.value)}
            placeholder="Customer Portal, Admin Panel, API Gateway..."
          />
        </label>

        <label>
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Login failure for valid users"
          />
        </label>

        <label>
          Description
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Steps to reproduce, expected behavior, environment..."
          />
        </label>

        {error && <p className="small" style={{ color: "#f97316" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create report"}
        </button>
      </form>
    </div>
  );
}

export default ReportForm;
