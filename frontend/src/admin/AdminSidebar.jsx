import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function AdminSidebar() {
  const navigate = useNavigate();

  const [admin] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("admin"));
    } catch {
      return null;
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <aside className="admin-sidebar">
      {/* LOGO */}

      <div className="admin-logo">
        <h2>IRHAM</h2>

        <span>ADMIN PANEL</span>
      </div>

      {/* ADMIN INFO */}

      <div className="admin-user">
        <div className="admin-avatar">
          {admin?.username ? admin.username.charAt(0).toUpperCase() : "A"}
        </div>

        <div>
          <strong>{admin?.username || "Admin"}</strong>

          <span>Administrator</span>
        </div>
      </div>

      {/* MENU */}

      <nav className="admin-menu">
        <NavLink to="/admin">Dashboard</NavLink>

        <NavLink to="/admin/projects">Projects</NavLink>

        <NavLink to="/admin/skills">Skills</NavLink>

        <NavLink to="/admin/messages">Messages</NavLink>
      </nav>

      {/* BOTTOM */}

      <div className="admin-bottom">
        <NavLink to="/" className="website-link">
          ← Back to Website
        </NavLink>

        <button type="button" className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
