const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const goalRoutes = require('./routes/goals');
const aiRoutes = require('./routes/ai');
const dashboardRoutes = require('./routes/dashboard');
const targetRoutes = require('./routes/targets');
const { connectToDatabase, getDatabaseStatus, runDatabaseHealthcheck } = require('./config/database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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

app.get('/health', async (_req, res) => {
  try {
    await runDatabaseHealthcheck();
    return res.json({ status: 'ok', db: getDatabaseStatus() });
  } catch (error) {
    return res.status(503).json({ status: 'degraded', db: getDatabaseStatus(), error: error.message });
  }
});

async function startServer() {
  try {
    await connectToDatabase();
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Backend listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
}

startServer();
