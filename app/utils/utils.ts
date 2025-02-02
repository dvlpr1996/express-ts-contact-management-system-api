export const isEmail = (email: string): boolean => {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

export const isPhoneNumber = (phone: string): boolean => {
  return /^09[1-9]{9}$/.test(phone);
};