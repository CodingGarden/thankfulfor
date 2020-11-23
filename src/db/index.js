const monk = require('monk');

const {
  DB_URL,
} = process.env;

const db = monk(DB_URL);

module.exports = db;
