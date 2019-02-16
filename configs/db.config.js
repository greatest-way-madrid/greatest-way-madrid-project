const mongoose = require('mongoose');

const DB_NAME = process.env.DB_NAME;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        console.info(`Connected to the database: ${MONGODB_URI}`)
    })
    .catch(error => {
        console.error('Database connection error:', error);
    });
