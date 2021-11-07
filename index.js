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

  await axios.post('http://posts-clusterip-srv:4000/events', event);
  // await axios.post('http://localhost:4001/events', event);
  // await axios.post('http://localhost:4002/events', event);
  // await axios.post('http://localhost:4003/events', event);

  res.status(200).json({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.status(200).json(events);
});

app.listen(4005, () => {
  console.log('Listening on port 4005');
});
