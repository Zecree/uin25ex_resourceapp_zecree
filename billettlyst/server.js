import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());

const PORT = 5000;
const API_KEY = process.env.TICKETMASTER_API_KEY;

app.get('/api/events', async (req, res) => {
  try {
    const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
      params: {
        apikey: API_KEY,
        ...req.query,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Klarte ikke å hente events' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy-server kjører på http://localhost:${PORT}`);
});