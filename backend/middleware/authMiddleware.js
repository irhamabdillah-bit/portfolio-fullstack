const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Akses ditolak. Token tidak ditemukan.",
      });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        message: "Format token tidak valid.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = decoded;

    next();
  } catch (error) {
    console.error("JWT error:", error.message);

    return res.status(401).json({
      message: "Token tidak valid atau sudah expired.",
    });
  }
};

module.exports = {
  verifyToken,
};
