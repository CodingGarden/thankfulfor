const express = require('express');

const thanks = require('./thanks');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/thanks', thanks);

module.exports = router;
