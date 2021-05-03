import { validateControl } from './Auth'
import { isValidEmail, isValidMinLength, validateRequired } from './helpers';

describe(validateControl, () => {

    const actual = 'fake@mail.com';
    const data = { required: true, email: true }
    const fake = 'fake@mail';

    test('Should return value isValid===true', () => {
        expect(validateControl(actual, data)).toBe(true);
        expect(validateControl(actual, data)).toBeTruthy()
    })
    test('Should return value isValid===false', () => {
        expect(validateControl(fake, { required: true, email: true })).toBe(false);
        expect(validateControl(fake, { required: true, email: true })).toBeFalsy()
    })
    test('Should has value and validation arguments', () => {
        expect(validateControl.length).toBe(2);
    })
    test('Should has value and validation arguments', () => {
        expect(validateControl.length).not.toBe(3);
    })
    test('Should has undefined for non validation', () => {
        expect(validateControl(fake, undefined)).toBe(false);
    })

})

describe(isValidMinLength, () => {

    const actual = 'string';
    const fake = 'string   ';

    test('Should return true', () => {
        expect(isValidMinLength(actual, 6)).toBe(true);

    })
    test('Should return false', () => {
        expect(isValidMinLength(fake, 15)).toBe(false);
    })

})

describe(isValidEmail, () => {

    const actual = 'test@mail.ru';
    const fake = 'test@mail';

    test('Should return true if valid email', () => {
        expect(isValidEmail(actual)).toBe(true);
    })
    test('Should return false if invalid email', () => {
        expect(isValidEmail(fake)).toBe(false);
    })
})
describe(validateRequired, () => {
    const actual = 'string     ';
    const exceded = actual.trim().length;

    test('Should return string without spaces', () => {
        expect(validateRequired(actual).length).toBe(exceded);
    })
    test('Should return string without spaces', () => {
        expect(validateRequired(actual).length).not.toBe(actual);
    })
})