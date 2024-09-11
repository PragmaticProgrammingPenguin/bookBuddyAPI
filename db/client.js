const { Client } = require("pg");
const connectionString = process.env.DATABASE_URL

const client = new pg.Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});

module.exports = db;
