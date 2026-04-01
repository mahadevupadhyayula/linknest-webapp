const mongoose = require('mongoose');

let isConnected = false;

async function connectToDatabase() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI is required');
  }

  if (!isConnected) {
    await mongoose.connect(mongoUri);
    isConnected = true;
  }

  await runDatabaseHealthcheck();

  return mongoose.connection;
}

async function runDatabaseHealthcheck() {
  await mongoose.connection.db.admin().ping();

  await mongoose.connection.db.collection('_healthchecks').updateOne(
    { _id: 'bootstrap' },
    { $set: { checked_at: new Date() } },
    { upsert: true }
  );
}

function getDatabaseStatus() {
  return {
    isConnected,
    readyState: mongoose.connection.readyState,
  };
}

module.exports = {
  connectToDatabase,
  runDatabaseHealthcheck,
  getDatabaseStatus,
};
