import 'dotenv/config';
import app from './app/app';
import mongoConnection from './app/configs/mongoConnection';
import { API_BASE_URL } from './app/configs/appConfigs';

const PORT = process.env.APP_PORT || 8000;

const startServer = async () => {
  try {
    if (!PORT) {
      throw new Error('APP_PORT or APP_URL env variable is missing');
    }

    await mongoConnection();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${API_BASE_URL}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();
