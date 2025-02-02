import { faker } from '@faker-js/faker';
import { Contact } from '../contact';
import mongoose from 'mongoose';
import { uniquePhoneNumberFaker } from '../../utils/utils';

const ContactFaker = async (): Promise<void> => {
  const fakePhoneNumbers: Array<string> = [
    '09001111111',
    '09002222222',
    '09003333333',
    '09004444444',
    '09005555555',
  ];

  const iterationCount: number = fakePhoneNumbers.length;

  try {
    const contacts = Array.from({ length: iterationCount }).map(() => {
      
      const phone = uniquePhoneNumberFaker(fakePhoneNumbers);

      return {
        user: new mongoose.Types.ObjectId(),
        name: faker.person.fullName(),
        phone,
        address: {
          city: faker.location.city(),
          street: faker.location.streetAddress(),
        },
        email: faker.internet.email(),
        description: faker.lorem.sentence(),
      };
    });

    console.log(`Faker is starting to generate ${iterationCount} contacts...`);
    await Contact.insertMany(contacts, { rawResult: false });
    console.log('fake contacts created successfully!');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Could not connect to the database to create fake data');
    }
    console.error('An Error Occurred While Creating Fake Connects:', error);
  }
};

export default ContactFaker;
