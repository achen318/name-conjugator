const express = require('express');

const app = express();

// ========== ROUTES ==========
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ========== SERVER =========
const PORT = process.envPORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
