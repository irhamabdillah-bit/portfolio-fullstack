const db = require("../config/db");

const getDashboardStats = async (req, res) => {
  try {
    const [[projectResult], [skillResult], [messageResult]] = await Promise.all(
      [
        db.query("SELECT COUNT(*) AS total FROM projects"),

        db.query("SELECT COUNT(*) AS total FROM skills"),

        db.query("SELECT COUNT(*) AS total FROM messages"),
      ],
    );

    res.status(200).json({
      projects: projectResult[0].total,
      skills: skillResult[0].total,
      messages: messageResult[0].total,
    });
  } catch (error) {
    console.error("Error dashboard stats:", error);

    res.status(500).json({
      message: "Gagal mengambil statistik dashboard",
    });
  }
};

module.exports = {
  getDashboardStats,
};
