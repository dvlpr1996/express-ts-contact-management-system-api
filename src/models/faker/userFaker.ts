import { faker } from '@faker-js/faker';
import { User } from '../user';
import CryptoJS from 'crypto-js';

const UserFaker = async (numEntries: number): Promise<void> => {
  const userEntries = [];

  for (let i = 0; i < numEntries; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const phone = `09${faker.string.numeric({ length: 9, allowLeadingZeros: false })}`;
    const password = CryptoJS.SHA256(faker.internet.password()).toString();
    const role = faker.helpers.arrayElement(['admin', 'user']);
    const createdAt = faker.date.past();

    userEntries.push({
      firstName,
      lastName,
      email,
      phone,
      password,
      role,
      isDeleted: false,
      createdAt,
      updatedAt: createdAt,
    });
  }

  try {
    console.log('Connecting to database and inserting users...');
    const result = await User.insertMany(userEntries);
    console.log(`${result.length} fake users created successfully!`);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating fake users:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
  }
};

export default UserFaker;
