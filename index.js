const express = require('express');
const cors = require('cors');
const axios = require('axios');
const morgan = require('morgan');
const { json, urlencoded } = express;

const app = express();

const events = [];

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.post('/events', async (req, res) => {
  const event = req.body;
  events.push(event);

  try {
    await axios.post('http://posts-srv:4000/events', event);
    await axios.post('http://comments-srv:4001/events', event);
    await axios.post('http://moderation-srv:4002/events', event);
    await axios.post('http://query-srv:4003/events', event);
    res.status(200).json({ status: 'OK' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 'FAIL' });
  }
});

app.get('/events', (req, res) => {
  res.status(200).json(events);
});

app.listen(4005, () => {
  console.log('Listening on port 4005');
});
