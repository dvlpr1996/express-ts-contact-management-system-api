import mongoose from 'mongoose';
import 'dotenv/config';

const MONGO_DB_COLLECTION_URL = process.env.MONGO_DB_URL;
mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error.message);
  process.exit(1);
});

const connectOptions: mongoose.ConnectOptions = {
  dbName: 'contact-management-system',
  connectTimeoutMS: 30000,
};

const mongoConnection = async () => {
  if (mongoose.connection.readyState !== 0 && mongoose.connection.readyState !== 3) {
    return;
  }

  try {
    if (!MONGO_DB_COLLECTION_URL) {
      throw new Error('MONGO_DB_URL env var is missing in environment variables.');
    }

    await mongoose.connect(MONGO_DB_COLLECTION_URL, connectOptions);

    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', true);
      mongoose.connection.on('connected', () => console.log('MongoDB connected successfully'));
      mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected'));
      mongoose.connection.on('reconnected', () => console.log('MongoDB reconnected'));
      mongoose.connection.on('disconnecting', () => console.log('Disconnecting MongoDB'));
      mongoose.connection.on('close', () => console.log('MongoDB connection closed'));
    }
  } catch (error) {
    if (error instanceof Error) {
      let errorMessage = 'An unexpected error occurred while connecting to MongoDB.';
      if (error.name === 'MongoNetworkError') {
        errorMessage = 'Network error occurred. Check your MongoDB server.';
      } else if (error.name === 'MongooseServerSelectionError') {
        errorMessage = 'Server selection error. Ensure MongoDB is running and accessible.';
      }

      console.error(`${errorMessage}, [{ stack: ${error.stack} }]`);
    }
    process.exit(1);
  }
};

export default mongoConnection;
