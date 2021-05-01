import { toLowerCaseFirstLetter, toTrim } from './helpers';


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