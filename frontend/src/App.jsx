import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ManageProjects from "./pages/ManageProjects";
import ManageSkills from "./pages/ManageSkills";
import Messages from "./pages/Messages";

import AdminLayout from "./admin/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================
            PUBLIC
        ========================= */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        {/* =========================
            ADMIN DASHBOARD
        ========================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* =========================
            ADMIN PROJECTS
        ========================= */}

        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <ManageProjects />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* =========================
            ADMIN SKILLS
        ========================= */}

        <Route
          path="/admin/skills"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <ManageSkills />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* =========================
            ADMIN MESSAGES
        ========================= */}

        <Route
          path="/admin/messages"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Messages />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
