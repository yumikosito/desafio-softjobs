const { Pool } = require('pg');
require('dotenv').config()

const config = {
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD ,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE 
}

const pool = new Pool(config);
module.exports = {pool}