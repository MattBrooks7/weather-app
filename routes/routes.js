const express = require('express');
const axios = require('axios');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

router.get('/weather', async (req, res) => {
  try {
    const apiKey = '70bf2034e2c84517bde01018243001';
    const city = req.query.city;
    const state = req.query.state;

    if (!city || !state) {
      return res.status(400).json({ error: 'City and state are required parameters.' });
    }

    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city},${state}`;

    const response = await axios.get(apiUrl);

    const weatherData = {
      temperatureFahrenheit: response.data.current.temp_f,
      description: response.data.current.condition.text,
      city,
      state,
    };

    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
