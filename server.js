const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors package
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/categoryRoutes");
const menuProductRoutes = require("./routes/menuProductRoutes");
const imageUpload = require("./routes/imageUpload");
const authMiddleware = require("./middleware/authMiddleware");
const db = require("./config/db"); // Import the MySQL connection
require("dotenv").config();
const orderRoutes = require("./routes/order");

const app = express();

// CORS Middleware Configuration
app.use(
  cors({
    origin: "http://localhost:3000", // Replace this with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
  })
);

// Middleware
app.use(bodyParser.json());

// Establish database connection
console.log("Attempting to connect to the database...");
db.getConnection()
  .then((connection) => {
    console.log("Connected to the MySQL database.");
    connection.release();

    // Start the server only after the database connection is established
    const port = process.env.PORT || 6000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed: ", err);
    process.exit(1); // Exit the application if the database connection fails
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/menu-product", menuProductRoutes);
app.use("/api/image-upload", imageUpload);
app.use("/orders", orderRoutes);

// Example protected route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});
