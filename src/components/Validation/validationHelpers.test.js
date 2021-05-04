import { isValidEmail, setMinLengthRequired, isValidAge, getCurrentDateUTC, setScoreValue } from './validationHelpers';

describe('isValidEmail', () => {

  //Act
  const actual = 'test@mail.ru';

  const expected = 'testmail.ru';


  test('Should return valid email', () => {
    expect(isValidEmail(actual)).toBe(true);
  });
  test('Should return invalid email', () => {
    expect(isValidEmail(expected)).toBe(false);
  });
});

describe(setMinLengthRequired, () => {
  test('Should return true if string more or equal than min length', () => {
    expect(setMinLengthRequired('Test', 4)).toBe(true);
  });

  test('Should return false if string lower than min length', () => {
    expect(setMinLengthRequired('Test', 5)).toBe(false);
  });
});

describe(isValidAge, () => {
  test('Should return true if age has correct value between 0 to 100 ', () => {
    expect(isValidAge(1)).toBe(true);
  });
  test('Should return true if age has correct value between 0 to 100 ', () => {
    expect(isValidAge(0)).toBe(false);
    expect(isValidAge(101)).toBe(false);
  });
});

describe(getCurrentDateUTC, () => {
  test('Should return true if input doesnt have past date  ', () => {
    expect(getCurrentDateUTC(new Date().toJSON().slice(0, 10).replace(/-/g, '-'))).toBe(true);
  });
  test('Should return not todays date ', () => {
    expect(getCurrentDateUTC('2021-05-02')).toBe(false);
  });
});

describe(setScoreValue, () => {
  test('Should return true if the score is within between min and max', () => {
    expect(setScoreValue(1, 100, 1)).toBe(true);
  });
  test('Should return not todays date ', () => {
    expect(setScoreValue()).toBe(false);
  });
});
