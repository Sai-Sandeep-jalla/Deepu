import mongoose from 'mongoose';
import dns from 'dns';

// Ensure SRV records resolve smoothly across Windows/ISP DNS resolvers
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {}

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('ℹ️  No MONGODB_URI provided in environment. Running in flexible fallback mode with in-memory seed store.');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️  MongoDB connection failed (${error.message}). Running with in-memory fallback store.`);
    return false;
  }
};
