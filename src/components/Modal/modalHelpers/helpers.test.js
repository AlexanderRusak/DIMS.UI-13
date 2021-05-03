import { toLowerCaseFirstLetter, toTrim, isFormValid, isValidFormCreateNewUsers } from './helpers';
import { helpersConst, helpersNewUsersField } from './helpersConst';


describe(toLowerCaseFirstLetter, () => {

    test('Should return string with first lowercase letter', () => {
        expect(toLowerCaseFirstLetter('Test')).toBe('test');
    });
    test('Should return string with first lowercase letter', () => {
        expect(toLowerCaseFirstLetter('Test')).not.toBe('Test');
    });

    test('Should use string value', () => {
        const value = 'TestValue';
        const failedValue='TEST';
        expect(typeof value === 'string').toBe(true);
        expect(toLowerCaseFirstLetter(value)).toBe('testValue');
        expect(toLowerCaseFirstLetter(failedValue)).not.toBe('testValue');
    })
});

describe(toTrim, () => {
    test('Should return string without spaces', () => {
        expect(toTrim('Word   ').length).toBe(4);
    })
})

describe(isFormValid, () => {
    test('Sholud return valid form', () => {
        expect(isFormValid(helpersConst)).toBe(true)
    })
})

describe(isValidFormCreateNewUsers, () => {
    test('Should return valid newUsersform', () => {
        expect(isValidFormCreateNewUsers(helpersNewUsersField)).toBe(true);
    });

    test('Should return invalid newUsersform', () => {
        expect(isValidFormCreateNewUsers({ ...helpersNewUsersField, something: '' })).toBe(false);
    test('Should return string without spaces', () => {
        expect(toTrim('Word   ').length).not.toBe(5);
    })
})