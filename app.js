const express = require('express');
const app = express();
const routes = require('./routes/index');

app.use(express.json());
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Welcome! ✅ Backend server is running.');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server is running on port ${PORT}`);
});
