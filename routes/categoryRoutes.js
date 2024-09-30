const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Validation rules for creating and updating categories
const validateCategory = [
  body("description").not().isEmpty().withMessage("Category name is required"),
];

// Get all categories
router.get("/", categoryController.getAllCategories);

// Get a single category by ID
router.get("/:id", categoryController.getCategoryById);

// Create a new category with validation
router.post("/", validateCategory, categoryController.createCategory);

// Update an existing category with validation
router.put("/:id", validateCategory, categoryController.updateCategory);

// Delete a category by ID
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
