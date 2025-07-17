const sql = require('mssql');
require('dotenv').config();

const mssqlConfig = {
  user: process.env.MSSQL_USER,
  password: process.env.MSSQL_PASSWORD,
  server: process.env.MSSQL_HOST,
  database: process.env.MSSQL_DATABASE,
  port: parseInt(process.env.MSSQL_PORT),
  options: {
    trustServerCertificate: true,
    enableArithAbort: true,
  },
};

const connectMSSQL = async () => {
  try {
    const pool = await sql.connect(mssqlConfig);
    console.log('✅ Connected to MSSQL');
    return pool;
  } catch (err) {
    console.error('❌ MSSQL connection error:', err);
    throw err;
  }
};

module.exports = connectMSSQL;
