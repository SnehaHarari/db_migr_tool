const express = require('express');
const router = express.Router();
const migrateController = require('../controllers/migrateController');

// Test route
router.get('/ping', (req, res) => {
  res.send('API is working ✅');
});

// Start migration
router.post('/migrate', migrateController.startMigration);

module.exports = router;
