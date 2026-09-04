const express = require("express");

const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// PUBLIC
router.get("/", getProjects);

// PROTECTED
router.post("/", verifyToken, createProject);

router.put("/:id", verifyToken, updateProject);

router.delete("/:id", verifyToken, deleteProject);

module.exports = router;
