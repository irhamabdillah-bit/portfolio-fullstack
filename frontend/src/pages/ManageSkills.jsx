import { useEffect, useState } from "react";
import { api } from "../utils/api";

function ManageSkills() {
  // =========================
  // STATE
  // =========================

  const [skills, setSkills] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteSkillId, setDeleteSkillId] = useState(null);
  const [deleteSkillName, setDeleteSkillName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    level: "",
    description: "",
  });

  // =========================
  // GET SKILLS
  // =========================

  const getSkills = async () => {
    try {
      const response = await api.getSkills();

      if (!response.ok) {
        throw new Error("Gagal mengambil data skills");
      }

      const data = await response.json();

      setSkills(data);
    } catch (error) {
      console.error("Error get skills:", error);
    }
  };

  // =========================
  // HANDLE CHANGE
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
      name: "",
      level: "",
      description: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  // =========================
  // ADD
  // =========================

  const handleAdd = () => {
    setFormData({
      name: "",
      level: "",
      description: "",
    });

    setEditingId(null);
    setShowForm(true);
  };

  // =========================
  // EDIT
  // =========================

  const handleEdit = (skill) => {
    setEditingId(skill.id);

    setFormData({
      name: skill.name || "",
      level: skill.level || "",
      description: skill.description || "",
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
        ? await api.updateSkill(editingId, formData)
        : await api.createSkill(formData);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal menyimpan skill");
      }

      alert(
        editingId ? "Skill berhasil diupdate!" : "Skill berhasil ditambahkan!",
      );

      resetForm();

      await getSkills();
    } catch (error) {
      console.error("Error submit skill:", error);

      alert(error.message || "Gagal menyimpan skill");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE CLICK
  // =========================

  const handleDeleteClick = (skill) => {
    setDeleteSkillId(skill.id);

    setDeleteSkillName(skill.name);
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = async () => {
    if (!deleteSkillId) {
      return;
    }

    try {
      const response = await api.deleteSkill(deleteSkillId);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal menghapus skill");
      }

      alert("Skill berhasil dihapus!");

      setDeleteSkillId(null);
      setDeleteSkillName("");

      await getSkills();
    } catch (error) {
      console.error("Error delete skill:", error);

      alert(error.message || "Gagal menghapus skill");
    }
  };

  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {
    getSkills();
  }, []);

  // =========================
  // RETURN
  // =========================

  return (
    <div className="manage-skills">
      {/* HEADER */}

      <div className="page-header">
        <div>
          <p className="page-subtitle">SKILL MANAGEMENT</p>

          <h1>Manage Skills</h1>

          <p>Kelola skill yang ditampilkan pada portfolio kamu.</p>
        </div>

        <button type="button" className="add-btn" onClick={handleAdd}>
          + Add Skill
        </button>
      </div>

      {/* FORM */}

      {showForm && (
        <div className="skill-form-card">
          <div className="form-header">
            <h2>{editingId ? "Edit Skill" : "Add New Skill"}</h2>

            <button type="button" className="close-btn" onClick={resetForm}>
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* NAME */}

            <div className="form-group">
              <label htmlFor="name">Skill Name</label>

              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Contoh: React"
                required
              />
            </div>

            {/* LEVEL */}

            <div className="form-group">
              <label htmlFor="level">Level</label>

              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
              >
                <option value="">Pilih level</option>

                <option value="Beginner">Beginner</option>

                <option value="Learning">Learning</option>

                <option value="Intermediate">Intermediate</option>

                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* DESCRIPTION */}

            <div className="form-group">
              <label htmlFor="description">Description</label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Contoh: Membuat UI dengan React"
                required
              />
            </div>

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
                    : "Add Skill"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SKILL LIST */}

      <div className="skill-list">
        {skills.length === 0 ? (
          <p>Belum ada skill.</p>
        ) : (
          skills.map((skill) => (
            <div className="admin-skill-card" key={skill.id}>
              <div className="skill-info">
                <h3>{skill.name}</h3>

                <span className="skill-level">{skill.level}</span>

                <p>{skill.description}</p>
              </div>

              <div className="skill-actions">
                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => handleEdit(skill)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => handleDeleteClick(skill)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DELETE MODAL */}

      {deleteSkillId && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <div className="delete-icon">!</div>

            <h2>Delete Skill?</h2>

            <p>
              Apakah kamu yakin ingin menghapus skill{" "}
              <strong>"{deleteSkillName}"</strong>?
            </p>

            <div className="delete-modal-actions">
              <button
                type="button"
                className="cancel-delete-btn"
                onClick={() => {
                  setDeleteSkillId(null);
                  setDeleteSkillName("");
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

export default ManageSkills;
