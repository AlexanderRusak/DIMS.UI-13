
import { isValidMinLength, isValidEmail, validateRequired } from './helpers'



export const validateControl = (value, validation) => {
  if (!validation) {
    return false;
  }  
  let isValid = true;

  if (validation.required) {
    isValid = validateRequired(value) && isValid;
  }
  if (validation.email) {
    isValid = isValidEmail(value) && isValid;
  }
  if (validation.minLength) {
    const { minLength } = validation;
    isValid = isValidMinLength(value, minLength) && isValid;
  }
  return isValid;
};
