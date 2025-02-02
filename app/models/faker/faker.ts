import mongoConnection from '../../configs/mongoConnection';
import ContactFaker from './contactFaker';
import UserFaker from './userFaker';
import mongoose from 'mongoose';

const runFaker = async () => {
  try {
    await mongoConnection();
    await UserFaker();
    await ContactFaker();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        'Could not connect to the database to create fake data',
        error.message
      );
    }
    console.error('An error occurred while creating fakers');
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed.');
  }
};

runFaker();
