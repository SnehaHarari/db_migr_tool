const sql = require('mssql');
const connectMSSQL = require('../config/mssql');

// Connect function wrapper
exports.connect = async () => {
  return await connectMSSQL();
};

// Fetch table data
exports.fetchTableData = async (pool, tableName) => {
  try {
    const result = await pool.request().query(`SELECT * FROM ${tableName}`);
    console.log(`✅ Fetched ${result.recordset.length} rows from MSSQL table: ${tableName}`);
    return result.recordset;
  } catch (err) {
    console.error(`❌ Error fetching data from MSSQL table ${tableName}:`, err);
    throw err;
  }
};
