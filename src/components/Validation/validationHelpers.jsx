export const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const setMinLengthRequired = (fieldString, reqLength) => {

  const length = fieldString ? fieldString.length : 0;
  return length >= reqLength;
};

export const setScoreValue = (score, max, min) => {
  console.log(score, max, min);
  if (min <= score && score <= max) {
    return !!score;
  }
  return score;
};

export const isValidAge = (age) => {
  return age > 0 && age <= 100;
}

export const isCheckBoxValueRequired = (lists) => {
  return !!Object.values(lists).find((list) => list.isCheck);
};

export const isValidForm = (validData) => {
  return !!Object.values(validData).every((item) => item === true)
}

export const errorTitle = (value) => {
  return {
    minLength: `The value should be more than ${value} letters`,

  }
}