const mssqlService = require('../services/mssqlService');
const pgService = require('../services/pgService');

exports.startMigration = async (req, res) => {
  const tables = req.body.tables; // Expecting array of table names

  if (!Array.isArray(tables) || tables.length === 0) {
    return res.status(400).json({ error: 'No tables provided for migration' });
  }

  try {
    const mssqlPool = await mssqlService.connect();

    for (const table of tables) {
      const data = await mssqlService.fetchTableData(mssqlPool, table);
      await pgService.insertTableData(table, data);
    }

    res.status(200).json({ message: 'Migration completed for all tables.' });
  } catch (err) {
    console.error('Migration error:', err);
    res.status(500).json({ error: 'Migration failed', details: err.message });
  }
};
