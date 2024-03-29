import { toLowerCaseFirstLetter, toTrim } from './helpers';

describe(toLowerCaseFirstLetter, () => {
  const actual = 'String';
  const expected = 'string';

  test('Should return string with first lowercase letter', () => {
    expect(toLowerCaseFirstLetter(actual)).toBe(expected);
  });
  test('Should return string with first lowercase letter', () => {
    expect(toLowerCaseFirstLetter(actual)).not.toBe(actual);
  });

  test('Should use string value', () => {
    expect(typeof actual === 'string').toBe(true);
    expect(typeof !!actual === 'string').toBe(false);
  });
});

describe(toTrim, () => {
  const actual = 'String     ';
  const expected = 'string';

  test('Should return string without spaces', () => {
    expect(toTrim(actual).length).toBe(6);
  });
  test('Should return string without spaces', () => {
    expect(toTrim(expected).length).not.toBe(7);
  });
});
