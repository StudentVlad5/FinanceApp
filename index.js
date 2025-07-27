const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const app = require('./app');
require('dotenv').config();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// Middleware
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ extended: true }));

const PORT = process.env.port || 3030;
const mongoUri = process.env.mongoUri;

const prod = true;

if (prod) {
  app.use(express.static(path.join(__dirname, './client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
  });
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log('✅ Database connection successful');
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
