import { regEmail } from '../../regConst';

export const validateEmail = (email) => {
  const re = regEmail;
  return re.test(String(email).toLowerCase());
};

export const validateControl = (value, validation) => {
  if (!validation) {
    return true;
  }
  let isValid = true;

  if (validation.required) {
    isValid = value.trim() && isValid;
  }
  if (validation.email) {
    isValid = validateEmail(value) && isValid;
  }
  if (validation.minLength) {
    isValid = value.length >= validation.minLength && isValid;
  }
  return isValid;
};
