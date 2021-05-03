import { regEmail } from '../../regConst';

export const isValidMinLength = (value, minLength) => {
    return value.length >= minLength;
}
export const isValidEmail = (email) => {
    return regEmail.test(email);
};

export const validateRequired = (value) => {
    return value.trim();
}