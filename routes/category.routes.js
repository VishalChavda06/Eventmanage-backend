const express = require("express");
const router = express.Router();

const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

const auth = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/role.middleware");

router.get("/", getAllCategories);
router.post("/", auth, isAdmin, createCategory);
router.put("/:id", auth, isAdmin, updateCategory);
router.delete("/:id", auth, isAdmin, deleteCategory);

module.exports = router;
