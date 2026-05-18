const Category = require("../models/category.model");
const { successResponse, errorResponse } = require("../utils/formatResponse");

const createCategory = async (req, res) => {
  try {
    const { name, description = "", image = "" } = req.body;

    if (!name || !name.trim()) {
      return errorResponse(res, "Category name is required", 400);
    }

    const existingCategory = await Category.findOne({
      name: { $regex: `^${name.trim()}$`, $options: "i" },
    });

    if (existingCategory) {
      return errorResponse(res, "Category already exists", 409);
    }

    const category = await Category.create({
      name: name.trim(),
      description,
      image,
    });

    return successResponse(res, "Category created successfully", category, 201);
  } catch (error) {
    return errorResponse(res, error.message || "Internal server error", 500);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ createdAt: -1 });
    return successResponse(res, "Categories fetched", categories, 200);
  } catch (error) {
    return errorResponse(res, error.message || "Internal server error", 500);
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, description, image } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return errorResponse(res, "Category not found", 404);
    }

    if (name !== undefined) category.name = name.trim();
    if (description !== undefined) category.description = description;
    if (image !== undefined) category.image = image;

    const updatedCategory = await category.save();
    return successResponse(res, "Category updated successfully", updatedCategory, 200);
  } catch (error) {
    return errorResponse(res, error.message || "Internal server error", 500);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (!category) {
      return errorResponse(res, "Category not found", 404);
    }

    category.isActive = false;
    await category.save();

    return successResponse(res, "Category deleted successfully", null, 200);
  } catch (error) {
    return errorResponse(res, error.message || "Internal server error", 500);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
