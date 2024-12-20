import { faker } from '@faker-js/faker';
import { Contact } from '../contact';
import mongoose from 'mongoose';

const ContactFaker = async (count: number) => {
  try {
    const contacts = Array.from({ length: count }).map(() => ({
      user: new mongoose.Types.ObjectId(),
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      address: {
        city: faker.location.city(),
        street: faker.location.streetAddress(),
      },
      email: faker.internet.email(),
      description: faker.lorem.sentence(),
    }));

    // Insert contacts into the database
    await Contact.insertMany(contacts);
    console.log(`${count} contacts seeded successfully.`);
  } catch (error) {
    console.error('Error seeding contacts:', error);
  } finally {
    mongoose.disconnect();
  }
};

export default ContactFaker;
