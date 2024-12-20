import mongoConnection from '../../boot/mongoConnection';
import ContactFaker from './contactFaker';
import UserFaker from './userFaker';

const runFaker = async () => {
  try {
    await mongoConnection();
    await UserFaker(5);
    await ContactFaker(5);
  } catch (err) {
    if (err instanceof Error) {
      throw new Error('Could not connect to the database to create fake data');
    }
    console.log(err.message);
  }
};

runFaker();
