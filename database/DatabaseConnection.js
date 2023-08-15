const { Client } = require("pg");

const client = new Client({
  user: "",
  host: "localhost",
  database: "your_database_name",
  port: 26257, // Default CockroachDB port
  ssl: {
    rejectUnauthorized: false, // For development purposes, disable SSL verification
  },
});

module.exports = client;
