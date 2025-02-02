import { faker } from '@faker-js/faker';
import { User } from '../user';
import CryptoJS from 'crypto-js';
import { RoleEnum } from '../../types/types';
import { uniquePhoneNumberFaker } from '../../utils/utils';

const UserFaker = async (): Promise<void> => {
  const userEntries = [];

  let adminExists: boolean = false;

  const fakePhoneNumbers: Array<string> = [
    '09091111111',
    '09092222222',
    '09093333333',
    '09094444444',
    '09095555555',
  ];

  const iterationCount: number = fakePhoneNumbers.length;

  for (let i = 0; i < iterationCount; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    // const phone = `09${faker.string.numeric({
    //   length: 9,
    //   allowLeadingZeros: false,
    // })}`;
    const phone = uniquePhoneNumberFaker(fakePhoneNumbers);
    const password = CryptoJS.SHA256('123456789').toString();
    const createdAt = faker.date.past();

    let role: RoleEnum = RoleEnum.USER;

    // If no admin exists, set role to ADMIN for one user
    if (!adminExists && i === 0) {
      role = RoleEnum.ADMIN;
      adminExists = true;
    }

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
    console.log(`Faker Is Starting To Generate ${iterationCount} Contacts...`);
    await User.insertMany(userEntries, { rawResult: false });
    console.log('Fake Users Created Successfully');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Could Not Connect To The Database To Create Fake Data');
    }
    console.error('An Error Occurred While Creating Fake Users:', error);
  }
};

export default UserFaker;
