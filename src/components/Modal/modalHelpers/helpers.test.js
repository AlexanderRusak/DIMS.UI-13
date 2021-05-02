import { toLowerCaseFirstLetter, toTrim, isFormValid, isValidFormCreateNewUsers } from './helpers';
import { helpersConst, helpersNewUsersField } from './helpersConst';


describe(toLowerCaseFirstLetter, () => {

    test('Should return string with first lowercase letter', () => {
        expect(toLowerCaseFirstLetter('Test')).toBe('test');
    });

    test('Should use string value', () => {
        const value = 'Test';
        expect(typeof value === 'string').toBe(true);
        expect(toLowerCaseFirstLetter(value)).toBe('test');
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
    })
})