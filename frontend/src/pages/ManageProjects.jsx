import { useEffect, useState } from "react";
import { api } from "../utils/api";

function ManageProjects() {
  // =========================
  // STATE
  // =========================

  const [projects, setProjects] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [deleteProjectId, setDeleteProjectId] = useState(null);

  const [deleteProjectTitle, setDeleteProjectTitle] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    project_url: "",
    image_url: "",
    github_url: "",
    role: "",
    challenge: "",
    solution: "",
    result: "",
  });

  // =========================
  // GET PROJECTS
  // =========================

  const getProjects = async () => {
    try {
      const response = await api.getProjects();

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));

        throw new Error(data.message || "Gagal mengambil data projects");
      }

      const data = await response.json();

      setProjects(data);
    } catch (error) {
      console.error("Error get projects:", error);
    }
  };

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      technologies: "",
      project_url: "",
      image_url: "",
      github_url: "",
      role: "",
      challenge: "",
      solution: "",
      result: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  // =========================
  // ADD PROJECT
  // =========================

  const handleAdd = () => {
    setFormData({
      title: "",
      description: "",
      technologies: "",
      project_url: "",
      image_url: "",
      github_url: "",
      role: "",
      challenge: "",
      solution: "",
      result: "",
    });

    setEditingId(null);
    setShowForm(true);
  };

  // =========================
  // EDIT PROJECT
  // =========================

  const handleEdit = (project) => {
    setEditingId(project.id);

    setFormData({
      title: project.title || "",
      description: project.description || "",
      technologies: project.technologies || "",
      project_url: project.project_url || "",
      image_url: project.image_url || "",
      github_url: project.github_url || "",
      role: project.role || "",
      challenge: project.challenge || "",
      solution: project.solution || "",
      result: project.result || "",
    });

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // CREATE / UPDATE
  // =========================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const response = editingId
        ? await api.updateProject(editingId, formData)
        : await api.createProject(formData);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal menyimpan project");
      }

      alert(
        editingId
          ? "Project berhasil diupdate!"
          : "Project berhasil ditambahkan!",
      );

      resetForm();

      await getProjects();
    } catch (error) {
      console.error("Error submit project:", error);

      alert(error.message || "Gagal menyimpan project");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE CLICK
  // =========================

  const handleDeleteClick = (project) => {
    setDeleteProjectId(project.id);
    setDeleteProjectTitle(project.title);
  };

  // =========================
  // DELETE PROJECT
  // =========================

  const handleDelete = async () => {
    if (!deleteProjectId) {
      return;
    }

    try {
      const response = await api.deleteProject(deleteProjectId);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal menghapus project");
      }

      alert("Project berhasil dihapus!");

      setDeleteProjectId(null);
      setDeleteProjectTitle("");

      await getProjects();
    } catch (error) {
      console.error("Error delete project:", error);

      alert(error.message || "Gagal menghapus project");
    }
  };

  // =========================
  // LOAD
  // =========================

  useEffect(() => {
    getProjects();
  }, []);

  // =========================
  // RETURN
  // =========================

  return (
    <div className="manage-projects">
      {/* =========================
          HEADER
      ========================= */}

      <div className="page-header">
        <div>
          <p className="page-subtitle">PROJECT MANAGEMENT</p>

          <h1>Manage Projects</h1>

          <p>Kelola semua project portfolio kamu.</p>
        </div>

        <button type="button" className="add-btn" onClick={handleAdd}>
          + Add Project
        </button>
      </div>

      {/* =========================
          FORM
      ========================= */}

      {showForm && (
        <div className="project-form-card">
          <div className="form-header">
            <h2>{editingId ? "Edit Project" : "Add New Project"}</h2>

            <button type="button" className="close-btn" onClick={resetForm}>
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* TITLE */}
            <div className="form-group">
              <label htmlFor="title">Project Title</label>

              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Contoh: E-Commerce Website"
                required
              />
            </div>
            {/* DESCRIPTION */}
            <div className="form-group">
              <label htmlFor="description">Description</label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Deskripsikan project kamu..."
                required
              />
            </div>
            {/* TECHNOLOGIES */}
            <div className="form-group">
              <label htmlFor="technologies">Technologies</label>

              <input
                id="technologies"
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                placeholder="React, Node.js, Express.js, MySQL"
              />

              <small>Pisahkan dengan koma.</small>
            </div>
            // apa aja nanti di ganti
            <div className="form-group">
              <label htmlFor="role">My Role</label>

              <input
                id="role"
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Contoh: Full Stack Developer"
              />

              <div className="form-group">
                <label htmlFor="challenge">Challenge</label>

                <textarea
                  id="challenge"
                  name="challenge"
                  value={formData.challenge}
                  onChange={handleChange}
                  placeholder="Masalah atau tantangan yang dihadapi..."
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="solution">Solution</label>

              <textarea
                id="solution"
                name="solution"
                value={formData.solution}
                onChange={handleChange}
                placeholder="Bagaimana kamu menyelesaikan masalah tersebut..."
              />
            </div>
            <div className="form-group">
              <label htmlFor="result">Result</label>

              <textarea
                id="result"
                name="result"
                value={formData.result}
                onChange={handleChange}
                placeholder="Hasil yang berhasil dicapai..."
              />
            </div>
            {/* LIVE DEMO */}
            <div className="form-group">
              <label htmlFor="project_url">Live Demo URL</label>

              <input
                id="project_url"
                type="url"
                name="project_url"
                value={formData.project_url}
                onChange={handleChange}
                placeholder="https://my-project.com"
              />
            </div>
            {/* GITHUB */}
            <div className="form-group">
              <label htmlFor="github_url">GitHub URL</label>

              <input
                id="github_url"
                type="url"
                name="github_url"
                value={formData.github_url}
                onChange={handleChange}
                placeholder="https://github.com/username/project"
              />
            </div>
            {/* IMAGE */}
            <div className="form-group">
              <label htmlFor="image_url">Project Image URL</label>

              <input
                id="image_url"
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="https://example.com/project.jpg"
              />
            </div>
            {/* IMAGE PREVIEW */}
            {formData.image_url && (
              <div className="image-preview">
                <p>Image Preview</p>

                <img
                  src={formData.image_url}
                  alt="Project preview"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}
            {/* ACTION */}
            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={resetForm}>
                Cancel
              </button>

              <button type="submit" className="save-btn" disabled={loading}>
                {loading
                  ? "Saving..."
                  : editingId
                    ? "Save Changes"
                    : "Add Project"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =========================
          PROJECT LIST
      ========================= */}

      <div className="project-list">
        {projects.length === 0 ? (
          <p>Belum ada project.</p>
        ) : (
          projects.map((project) => (
            <div className="admin-project-card" key={project.id}>
              <div className="project-info">
                {project.image_url && (
                  <img
                    src={project.image_url}
                    alt={`${project.title} preview`}
                    className="admin-project-image"
                  />
                )}

                <div>
                  <h3>{project.title}</h3>

                  <p>{project.description}</p>

                  {project.technologies && (
                    <small>{project.technologies}</small>
                  )}
                </div>
              </div>

              <div className="project-actions">
                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => handleEdit(project)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => handleDeleteClick(project)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* =========================
          DELETE MODAL
      ========================= */}

      {deleteProjectId && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <div className="delete-icon">!</div>

            <h2>Delete Project?</h2>

            <p>
              Apakah kamu yakin ingin menghapus project{" "}
              <strong>"{deleteProjectTitle}"</strong>?
            </p>

            <div className="delete-modal-actions">
              <button
                type="button"
                className="cancel-delete-btn"
                onClick={() => {
                  setDeleteProjectId(null);
                  setDeleteProjectTitle("");
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                className="confirm-delete-btn"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageProjects;
