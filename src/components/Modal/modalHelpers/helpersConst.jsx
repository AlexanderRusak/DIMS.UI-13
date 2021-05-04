export const helpersConst = {
  email: {
    value: '',
    type: 'email',
    title: 'Email',
    errorMessage: 'Enter correct email',
    valid: true,
    touched: false,
    validation: {
      required: true,
      email: true,
    },
  },
  password: {
    value: '',
    type: 'password',
    title: 'Password',
    errorMessage: 'Input correct password',
    valid: true,
    touched: false,
    validation: {
      required: true,
      minLength: 6,
    },
  },
};

export const helpersNewUsersField = {
  fullName: 'Some Valid Data',
  email: 'Some Valid Data',
  direction: 'Some Valid Data',
  sex: 'Some Valid Data',
  education: 'Some Valid Data',
  age: 'Some Valid Data',
  universityAverageScore: 'Some Valid Data',
  mathScore: 'Some Valid Data',
  address: 'Some Valid Data',
  mobilePhone: 'Some Valid Data',
  skype: 'Some Valid Data',
  startDate: 'Some Valid Data',
  role: 'Some Valid Data',
};
