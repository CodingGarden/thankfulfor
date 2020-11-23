const db = require('./index');

const thanks = db.get('thanks');
thanks.createIndex({ slug: 1 }, { unique: true });

module.exports = thanks;
