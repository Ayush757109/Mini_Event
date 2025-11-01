const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`✅ MongoDB connected successfully: ${connection.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB disconnected');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    // Exit the process if database connection fails
    process.exit(1);
  }
};

module.exports = connectDatabase;