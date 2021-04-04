export const getDataFromLS = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setDataToLS = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
