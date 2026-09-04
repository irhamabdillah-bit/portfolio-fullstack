import AdminSidebar from "./AdminSidebar";
import "./Admin.css";

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-content">{children}</main>
    </div>
  );
}

export default AdminLayout;
