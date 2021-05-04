import { toLowerCaseFirstLetter, toTrim } from './helpers';

describe(toLowerCaseFirstLetter, () => {

  //Act
  const actual = 'String';

  //Arrange
  const expected = 'string';


  //Arrange
  test('Should return string with first lowercase letter', () => {
    expect(toLowerCaseFirstLetter(actual)).toBe(expected);
  });
  test('Should return string with first capitalyze letter', () => {
    expect(toLowerCaseFirstLetter(actual)).not.toBe(actual);
  });

  test('Should use string value', () => {
    expect(typeof actual === 'string').toBeTruthy()
  });

  test('Should return false if used not string', () => {
    expect(typeof !!actual === 'string').toBeFalsy()
  });
});
 
describe(toTrim, () => {

  //Act
  const actual = 'String     ';

  //Arrange
  const expected = 'string';


  //Accept
  test('Should return string without spaces', () => {
    expect(toTrim(actual).length).toBe(6);
  });
  test('Should return string without spaces', () => {
    expect(toTrim(expected).length).not.toBe(7);
  });
});
