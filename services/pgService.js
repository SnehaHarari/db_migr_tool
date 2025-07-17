const pgPool = require('../config/pg');

exports.insertTableData = async (tableName, data) => {
  if (!data || data.length === 0) {
    console.log(`⚠️ No data to insert for table: ${tableName}`);
    return;
  }

  const client = await pgPool.connect();

  try {
    await client.query('BEGIN');

    const columns = Object.keys(data[0]);
    const quotedColumns = columns.map(col => `"${col}"`).join(', ');

    for (const row of data) {
      const values = Object.values(row);
      const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

      const query = `INSERT INTO ${tableName} (${quotedColumns}) VALUES (${placeholders})`;
      await client.query(query, values);
    }

    await client.query('COMMIT');
    console.log(`✅ Inserted ${data.length} rows into PostgreSQL table: ${tableName}`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(`❌ Error inserting data into PostgreSQL table ${tableName}:`, err);
    throw err;
  } finally {
    client.release();
  }
};
