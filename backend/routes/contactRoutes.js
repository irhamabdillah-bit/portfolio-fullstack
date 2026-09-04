const express = require("express");

const {
  sendContact,
  getMessages,
} = require("../controllers/contactController");

const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// PUBLIC
router.post("/", sendContact);

// PROTECTED
router.get("/", verifyToken, getMessages);

module.exports = router;
