const db = require("../config/db");

// =========================
// CREATE MESSAGE
// =========================

const sendContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validasi
    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email, dan message wajib diisi",
      });
    }

    const query = `
      INSERT INTO messages
      (name, email, message)
      VALUES (?, ?, ?)
    `;

    await db.query(query, [name, email, message]);

    res.status(201).json({
      success: true,
      message: "Pesan berhasil dikirim!",
    });
  } catch (error) {
    console.error("Error send contact:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengirim pesan",
    });
  }
};

// =========================
// GET ALL MESSAGES
// =========================

const getMessages = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM messages ORDER BY id DESC");

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error get messages:", error);

    res.status(500).json({
      message: "Gagal mengambil messages",
    });
  }
};

module.exports = {
  sendContact,
  getMessages,
};
