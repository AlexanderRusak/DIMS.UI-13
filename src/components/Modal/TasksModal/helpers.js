export const isNotCreateType = (type, data, index) => {
  return type !== 'create' ? data.data[index] : '';
};

export const isEditValid = (type, data, index) => {
  return type === 'edit' ? !!data.data[index] : false;
};
