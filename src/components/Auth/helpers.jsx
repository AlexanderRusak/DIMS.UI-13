import { regEmail } from '../../regConst';

export const isValidMinLength = (value, minLength) => {
    return value.length >= minLength;
}
export const isValidEmail = (email) => {
    const re = regEmail;
    return re.test(String(email).toLowerCase());
};

export const validateRequired = (value) => {
    return value.trim();
}