const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const goalRoutes = require('./routes/goals');
const aiRoutes = require('./routes/ai');
const dashboardRoutes = require('./routes/dashboard');
const targetRoutes = require('./routes/targets');

function createApp() {
  const app = express();

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
      credentials: true,
    })
  );
  app.use(express.json());

  app.use('/auth', authRoutes);
  app.use('/goals', goalRoutes);
  app.use('/ai', aiRoutes);
  app.use('/dashboard', dashboardRoutes);
  app.use('/targets', targetRoutes);

  return app;
}

module.exports = { createApp };
