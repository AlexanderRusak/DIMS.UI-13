import { validateControl } from './Auth';
import { isValidEmail, isValidMinLength, validateRequired } from './helpers';

describe('validateControl', () => {
  /* //Act */
  const actual = 'fake@mail.com';

  /* //Arrange */
  const data = { required: true, email: true };
  const fake = 'fake@mail';

  test('Should return value isValid===true', () => {
    expect(validateControl(actual, data)).toBeTruthy();
  });
  test('Should return value isValid===false', () => {
    expect(validateControl(fake, { required: true, email: true })).toBeFalsy();
  });

  /* //Assert */
  test('Should has undefined for non validation', () => {
    expect(validateControl(fake, undefined)).toBeFalsy();
  });
});

describe('validateControl', () => {
  /* //Act */
  const actual = validateControl.length;
  console.log(actual, 'test');
  /* //Arrange */
  const expected = 2;

  /* //Assert */
  test('Should has value and validation arguments', () => {
    expect(actual).toBe(expected);
  });
  test('Should has value and validation arguments', () => {
    expect(actual).not.toBe(3);
  });
});

describe('isValidMinLength', () => {
  /* //Act */
  const actual = 'string';

  /* //Arrange */
  const fake = 'string   ';

  /*  //Assert */
  test('Should return true', () => {
    expect(isValidMinLength(actual, 6)).toBe(true);
  });
  test('Should return false', () => {
    expect(isValidMinLength(fake, 15)).toBe(false);
  });
});

describe('isValidEmail', () => {
  /* //Act */
  const actual = 'test@mail.ru';

  /* //Arrange */
  const fake = 'test@mail';

  /* //Assert */
  test('Should return true if valid email', () => {
    expect(isValidEmail(actual)).toBe(true);
  });
  test('Should return false if invalid email', () => {
    expect(isValidEmail(fake)).toBe(false);
  });
});

describe('validateRequired', () => {
  /*    //Act */
  const actual = 'string     ';

  /* //Arrange */
  const expected = actual.trim().length;

  /* //Assert */
  test('Should return string without spaces', () => {
    expect(validateRequired(actual).length).toBe(expected);
  });
  test('Should return string without spaces', () => {
    expect(validateRequired(actual).length).not.toBe(actual);
  });
});
