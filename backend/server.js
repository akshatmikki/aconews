const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const API_KEY = process.env.GNEWS_API_KEY;

app.get('/api/news', async (req, res) => {
  const { query = 'latest', page = 1 } = req.query;
  try {
    const response = await axios.get('https://gnews.io/api/v4/search', {
      params: {
        q: query,
        token: API_KEY,
        lang: 'en',
        max: 10,
        page: page,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
