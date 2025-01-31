import 'dotenv/config';
import app from './app/app';
import mongoConnection from './app/configs/mongoConnection';
import { API_ROUTE_VERSION } from './app/constants/constants';

const PORT = process.env.APP_PORT || 8000;
const APP_URL = process.env.APP_URL || 'localhost';

const startServer = async () => {
  try {
    if (!PORT || !APP_URL) {
      throw new Error('APP_PORT or APP_URL env variable is missing');
    }

    await mongoConnection();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${APP_URL}:${PORT}${API_ROUTE_VERSION}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();
