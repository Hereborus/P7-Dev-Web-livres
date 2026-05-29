require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// tes routes ici

app.listen(process.env.PORT || 4000, () => {
  console.log(`Serveur démarré sur le port ${process.env.PORT || 4000}`);
});
