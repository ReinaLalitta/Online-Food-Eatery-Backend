// routes/auth.js
const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const authController = require("../controllers/authController");
// Register route with validation
router.post(
  "/register",
  [
    body("full_name").not().isEmpty().withMessage("Full name is required"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  authController.register
);

// Login route with validation
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").not().isEmpty().withMessage("Password is required"),
  ],
  authController.login
);

module.exports = router;
