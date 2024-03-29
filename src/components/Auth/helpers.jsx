import { regEmail } from '../../regConst';

export const isValidMinLength = (value, minLength) => {
  return value.length >= minLength;
};
export const isValidEmail = (email) => {
  return regEmail.test(String(email).toLowerCase());
};

export const validateRequired = (value) => {
  return value.trim();
};
