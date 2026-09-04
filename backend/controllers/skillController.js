const db = require("../config/db");

// GET All Skills
const getSkills = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM skills ORDER BY id DESC");

    res.status(200).json(rows);
  } catch (err) {
    console.error("Error get skills:", err);
    res.status(500).json({ message: "Gagal mengambil data skills" });
  }
};

// Create Skill
const createSkill = async (req, res) => {
  try {
    const { name, level, description } = req.body;
    if (!name || !level || !description) {
      return res
        .status(400)
        .json({ message: "Name, level, dan description wajib diisi" });
    }
    const query = `
      INSERT INTO skills
      (name, level, description)
      VALUES (?, ?, ?)
    `;
    const [result] = await db.query(query, [name, level, description]);
    res.status(201).json({
      message: "Skill berhasil ditambahkan",
      skill: {
        id: result.insertId,
        name,
        level,
        description,
      },
    });
  } catch (err) {
    console.error("Error create skill", err);
    res.status(500).json({ message: "Gagal menambahkan skill" });
  }
};

// Update skills
const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, level, description } = req.body;
    if (!name || !level || !description) {
      return res
        .status(400)
        .json({ message: "Name, Level, Description wajib diisi" });
    }
    const query = `
      UPDATE skills
      SET
        name = ?,
        level = ?,
        description = ?
      WHERE id = ?
    `;

    const [result] = await db.query(query, [name, level, description, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Skill tidak ditemukan" });
    }
    res.status(200).json({
      message: "Skill berhasil diupdate",
    });
  } catch (err) {
    console.error("Error update skill", err);
    return res.status(500).json({ message: "Gagal mengupdate skill" });
  }
};

// Delete Skills
const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query("DELETE FROM skills WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Skill tidak ditemukan",
      });
    }

    res.status(200).json({
      message: "Skill berhasil dihapus",
    });
  } catch (error) {
    console.error("Error delete skill:", error);

    res.status(500).json({
      message: "Gagal menghapus skill",
    });
  }
};

module.exports = {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};
