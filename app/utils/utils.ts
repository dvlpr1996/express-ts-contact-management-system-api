export const isEmail = (email: string): boolean => {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

export const isPhoneNumber = (phone: string): boolean => {
  return /^09[0-9]{9}$/.test(phone);
};

export const uniquePhoneNumberFaker = (fakePhoneNumbers: Array<string>) => {
  if (fakePhoneNumbers.length === 0) {
    throw new Error('Not enough unique phone numbers available.');
  }
  // Remove and get a unique phone number
  const phoneIndex = Math.floor(Math.random() * fakePhoneNumbers.length);
  return fakePhoneNumbers.splice(phoneIndex, 1)[0];
};
