const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/news', async (req, res) => {
  const { category, page, searchTerm } = req.query;
  const API_KEY = 'eb50e78b9f9e43f0b38b069618817a80'; 
  const BASE_URL = 'https://newsapi.org/v2';

  try {
    const response = await axios.get(
      searchTerm ? `${BASE_URL}/everything` : `${BASE_URL}/top-headlines`,
      {
        params: {
          apiKey: API_KEY,
          q: searchTerm || undefined,
          category: searchTerm ? undefined : category || undefined,
          page: page,
          pageSize: 10,
          country: searchTerm ? undefined : 'us',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
