import { validateControl } from './Auth'
import { isValidEmail, isValidMinLength, validateRequired } from './helpers';

describe(validateControl, () => {

    test('Should return value isValid===true', () => {
        expect(validateControl('fake@mail.com', { required: true, email: true })).toBe(true);
        expect(validateControl('fake@mail.com', { required: true, email: true })).toBeTruthy()
    })
    test('Should return value isValid===false', () => {
        expect(validateControl('fake@mail', { required: true, email: true })).toBe(false);
        expect(validateControl('fake@mail', { required: true, email: true })).toBeFalsy()
    })
    test('Should has value and validation arguments', () => {
        expect(validateControl.length).toBe(2);
    })
    test('Should has undefined for non validation', () => {
        expect(validateControl('fake@mail', undefined)).toBe(false);
    })

})

describe(isValidMinLength, () => {
    test('Should return true', () => {
        expect(isValidMinLength('123456', 6)).toBe(true);
        expect(isValidMinLength('12345', 6)).toBe(false);
    })
})

describe(isValidEmail, () => {
    test('Should return valid email', () => {
        expect(isValidEmail('test@mail.ru')).toBe(true);
    })
    test('Should return unvalid email', () => {
        expect(isValidEmail('test@mail')).toBe(false);
        expect(isValidEmail('testmail.ru')).toBe(false);
    })
})
describe(validateRequired, () => {
    test('Should return string without spaces', () => {
        expect(validateRequired('Word   ').length).toBe(4);
    })
})