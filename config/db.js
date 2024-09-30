const mysql = require('mysql2');
require('dotenv').config();

// Log the database configuration to ensure the environment variables are loaded correctly
console.log('Database Configurations: ', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ? '******' : '(empty)',
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Create a MySQL pool using the provided credentials
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Log whether the pool was created successfully
console.log('Database connection pool created successfully.');

module.exports = pool.promise();