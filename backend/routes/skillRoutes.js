const express = require("express");

const {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} = require("../controllers/skillController");

const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// PUBLIC
router.get("/", getSkills);

// PROTECTED
router.post("/", verifyToken, createSkill);

router.put("/:id", verifyToken, updateSkill);

router.delete("/:id", verifyToken, deleteSkill);

module.exports = router;
