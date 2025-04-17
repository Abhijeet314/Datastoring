// lib/mongodb.ts
import mongoose from 'mongoose';

// Connection state
const connection = {
  isConnected: false,
};

async function dbConnect() {
  // Check if we have an active connection
  if (connection.isConnected) {
    return;
  }

  // If no connection exists, create one
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI as string);
    
    connection.isConnected = db.connections[0].readyState === 1;
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Error connecting to database');
  }
}

export default dbConnect;