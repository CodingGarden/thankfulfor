const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

/** Needed for vercel */
app.get('/js/client.js', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'js', 'client.js'));
});

app.get('/js/slug.js', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'js', 'slug.js'));
});
/** Needed for vercel */

app.get('/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'slug.html'));
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
