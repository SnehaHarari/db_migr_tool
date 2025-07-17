const { Pool } = require('pg');
require('dotenv').config();

const pgPool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT),
});

pgPool.connect()
  .then(() => console.log('✅ Connected to PostgreSQL'))
  .catch((err) => console.error('❌ PostgreSQL connection error:', err));

module.exports = pgPool;
