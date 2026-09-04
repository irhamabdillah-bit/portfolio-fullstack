const db = require("../config/db");

// =========================
// GET ALL PROJECTS
// =========================

const getProjects = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM projects ORDER BY id DESC");

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error get projects:", error);

    res.status(500).json({
      message: "Gagal mengambil data projects",
    });
  }
};

// =========================
// CREATE PROJECT
// =========================

const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      technologies,
      project_url,
      image_url,
      github_url,
      role,
      challenge,
      solution,
      result,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title dan description wajib diisi",
      });
    }

    const query = `
      INSERT INTO projects (
        title,
        description,
        technologies,
        project_url,
        image_url,
        github_url,
        role,
        challenge,
        solution,
        result
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [insertResult] = await db.query(query, [
      title,
      description,
      technologies || "",
      project_url || "",
      image_url || "",
      github_url || "",
      role || "",
      challenge || "",
      solution || "",
      result || "",
    ]);

    res.status(201).json({
      message: "Project berhasil ditambahkan",

      project: {
        id: insertResult.insertId,
        title,
        description,
        technologies: technologies || "",
        project_url: project_url || "",
        image_url: image_url || "",
        github_url: github_url || "",
        role: role || "",
        challenge: challenge || "",
        solution: solution || "",
        result: result || "",
      },
    });
  } catch (error) {
    console.error("Error create project:", error);

    res.status(500).json({
      message: "Gagal menambahkan project",
    });
  }
};

// =========================
// UPDATE PROJECT
// =========================

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      technologies,
      project_url,
      image_url,
      github_url,
      role,
      challenge,
      solution,
      result,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title dan description wajib diisi",
      });
    }

    const query = `
      UPDATE projects
      SET
        title = ?,
        description = ?,
        technologies = ?,
        project_url = ?,
        image_url = ?,
        github_url = ?,
        role = ?,
        challenge = ?,
        solution = ?,
        result = ?
      WHERE id = ?
    `;

    const [updateResult] = await db.query(query, [
      title,
      description,
      technologies || "",
      project_url || "",
      image_url || "",
      github_url || "",
      role || "",
      challenge || "",
      solution || "",
      result || "",
      id,
    ]);

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({
        message: "Project tidak ditemukan",
      });
    }

    res.status(200).json({
      message: "Project berhasil diupdate",
    });
  } catch (error) {
    console.error("Error update project:", error);

    res.status(500).json({
      message: "Gagal mengupdate project",
    });
  }
};

// =========================
// DELETE PROJECT
// =========================

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const [deleteResult] = await db.query("DELETE FROM projects WHERE id = ?", [
      id,
    ]);

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({
        message: "Project tidak ditemukan",
      });
    }

    res.status(200).json({
      message: "Project berhasil dihapus",
    });
  } catch (error) {
    console.error("Error delete project:", error);

    res.status(500).json({
      message: "Gagal menghapus project",
    });
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};
