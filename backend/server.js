const dotenv = require('dotenv');
const { connectToDatabase, getDatabaseStatus, runDatabaseHealthcheck } = require('./config/database');
const { createApp } = require('./app');

dotenv.config();

const app = createApp();
const PORT = process.env.PORT || 5000;

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
