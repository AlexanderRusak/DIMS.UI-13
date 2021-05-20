import { setMinLengthRequired, errorTitle } from '../../Validation/validationHelpers';

export const isNotCreateType = (type, data, index) => {
  return type !== 'create' ? data.data[index] : '';
};

export const isEditValid = (type, data, index) => {
  return type === 'edit' ? !!data.data[index] : false;
};

export const getUserDataArray = (state) => {
  const { taskName, deadLine, description, startDate, touched } = state;
  return [
    {
      value: taskName,
      title: 'Task Name',
      isValid: !!setMinLengthRequired(taskName, 5) || !touched.taskName,
      errorMessage: errorTitle(5).minLength,
    },
    {
      value: description,
      title: 'Description',
      isValid: !!setMinLengthRequired(description, 10) || !touched.description,
      errorMessage: errorTitle(10).minLength,
    },
    {
      value: startDate,
      title: 'Start Date',
      inputType: 'date',
      isValid: startDate <= deadLine || !touched.startDate,
      errorMessage: 'Start Date should be less or equal "Dead Line"',
    },
    {
      value: deadLine,
      title: 'Dead Line',
      inputType: 'date',
      isValid: deadLine >= startDate || !touched.deadLine,
      errorMessage: 'Dead Line should be more or equal "Start Date"',
    },
  ];
};
