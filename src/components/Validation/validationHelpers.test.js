import { isValidEmail, setMinLengthRequired, isValidAge, getCurrentDateUTC, setScoreValue } from './validationHelpers';

describe(isValidEmail, () => {
  test('Should return valid email', () => {
    expect(isValidEmail('test@mail.ru')).toBe(true);
  });
  test('Should return unvalid email', () => {
    expect(isValidEmail('test@mail')).toBe(false);
    expect(isValidEmail('testmail.ru')).toBe(false);
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
