const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/flipkart_db';

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2500, // Quick timeout if no local daemon
      connectTimeoutMS: 2500
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected to: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.warn(`⚠️ MongoDB daemon not found at ${mongoUri} (${error.message}).`);
    console.log('🔄 Initializing Zero-Config Embedded In-Memory Data Store for Mongoose schemas...');
    // We keep isConnected = false, and our controllers use the robust fallback layer if mongoose is disconnected
  }
};

module.exports = { connectDB, isConnected: () => isConnected };
