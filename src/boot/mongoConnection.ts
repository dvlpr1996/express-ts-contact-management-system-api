import mongoose from 'mongoose';

const MONGO_DB_URL = process.env.MONGO_DB_URL;

mongoose.connection.on('error', (_error) => {
  throw new Error('MongoDB connection failed');
});

const connectOptions = {
  // useUnifiedTopology: true,
  // dbName: process.env.DB_NAME,
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
  // useCreateIndex: true,
  // useUnifiedTopology: true,
  // useNewUrlParser: true,
};

const mongoConnection = async () => {
  if (mongoose.connection.readyState === 1) return;

  try {
    if (!MONGO_DB_URL) {
      throw new Error('[MONGO_DB_URL] is missing in environment variables. Please add it to the .env file.');
    }

    await mongoose.connect(MONGO_DB_URL, connectOptions);

    if (process.env.NODE_ENV === 'development') {
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
      }

      if (error.name === 'MongooseServerSelectionError') {
        errorMessage = 'Server selection error. Ensure MongoDB is running and accessible.';
      }

      throw new Error(`errorMessage, [{ stack: ${error.stack} }]`);
    }
  }
};

export default mongoConnection;
