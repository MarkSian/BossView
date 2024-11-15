// Import the Pool class from the pg (PostgreSQL) library
const { Pool } = require('pg');

// Load environment variables from a .env file into process.env
require('dotenv').config();

// Create a new instance of Pool to manage a pool of PostgreSQL connections
const pool = new Pool({
    // Set the database user from the environment variable
    user: process.env.DB_USER,

    // Set the host of the PostgreSQL server from the environment variable
    host: process.env.DB_HOST,

    // Set the name of the database to connect to from the environment variable
    database: process.env.DB_NAME,

    // Set the password for the database user from the environment variable
    password: process.env.DB_PASS,

    // Set the port number where the PostgreSQL server is listening from the environment variable
    port: process.env.DB_PORT,
});

// Export the pool instance for use in other modules
module.exports = pool;