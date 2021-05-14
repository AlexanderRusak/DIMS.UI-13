import {
  setMinLengthRequired,
  isValidEmail,
  errorTitle,
  isValidAge,
  setScoreValue,
  getCurrentDateUTC,
} from '../../Validation/validationHelpers';

export const getInputsData = (data) => {
  return [
    {
      title: 'Full Name',
      type: 'text',
      isValid: setMinLengthRequired(data.fullName, 2),
      errorMessage: errorTitle(2).minLength,
    },
    { title: 'Email', type: 'email', isValid: isValidEmail(data.email), errorMessage: 'Invalid email' },
    {
      title: 'Education',
      type: 'text',
      isValid: setMinLengthRequired(data.education, 3),
      errorMessage: errorTitle(3).minLength,
    },
    { title: 'Age', type: 'number', isValid: isValidAge(data.age), errorMessage: 'Age should be between 1 to 100' },
    {
      title: 'University Average Score',
      type: 'number',
      isValid: setScoreValue(+data.universityAverageScore, 0, 100),
      errorMessage: 'Score should be between 0 to 100',
    },
    {
      title: 'Math Score',
      type: 'number',
      isValid: setScoreValue(+data.mathScore, 0, 100),
      errorMessage: 'Score should be between 0 to 100',
    },
    { title: 'Address', type: 'text', isValid: setMinLengthRequired(data.address, 3) },
    {
      title: 'Mobile Phone',
      type: 'number',
      isValid: setMinLengthRequired(data.mobilePhone, 12),
      errorMessage: 'Number should has 12 numbers',
    },
    { title: 'Skype', type: 'text', isValid: setMinLengthRequired(data.skype, 3) },
    {
      title: 'Start Date',
      type: 'date',
      isValid: getCurrentDateUTC(data.startDate),
      errorMessage: 'Date should not be in past    ',
    },
  ];
};
