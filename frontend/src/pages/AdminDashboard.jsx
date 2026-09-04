import { useEffect, useState } from "react";
import { api } from "../utils/api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    messages: 0,
  });

  const [loading, setLoading] = useState(true);

  const getStats = async () => {
    try {
      const response = await api.getDashboardStats();

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal mengambil statistik");
      }

      setStats(data);
    } catch (error) {
      console.error("Error dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  const admin = (() => {
    try {
      return JSON.parse(localStorage.getItem("admin"));
    } catch {
      return null;
    }
  })();

  return (
    <div className="dashboard">
      {/* HEADER */}

      <div className="dashboard-header">
        <p className="dashboard-subtitle">ADMIN DASHBOARD</p>

        <h1>Welcome back, {admin?.username || "Admin"} 👋</h1>

        <p>Kelola project dan skills portfolio kamu dari satu tempat.</p>
      </div>

      {/* STATS */}

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Projects</h3>

          <span>{loading ? "..." : stats.projects}</span>
        </div>

        <div className="stat-card">
          <h3>Total Skills</h3>

          <span>{loading ? "..." : stats.skills}</span>
        </div>

        <div className="stat-card">
          <h3>Messages</h3>

          <span>{loading ? "..." : stats.messages}</span>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
