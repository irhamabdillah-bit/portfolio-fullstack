const bcrypt = require("bcryptjs");
const db = require("./config/db");

const createAdmin = async () => {
  try {
    const username = "admin";
    const password = "admin123";

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `
      INSERT INTO admins
      (username, password)
      VALUES (?, ?)
      `,
      [username, hashedPassword],
    );

    console.log("Admin berhasil dibuat!");

    process.exit();
  } catch (error) {
    console.error("Gagal membuat admin:", error);

    process.exit(1);
  }
};

createAdmin();
