export const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const setMinLengthRequired = (fieldString, reqLength) => {
  return fieldString.length >= reqLength;
};

export const isCheckBoxValueRequired = (lists) => {
  return !!Object.values(lists).find((list) => list.isCheck);
};
