import PropTypes from 'prop-types';
import { Component } from 'react';
import { MEMBERS } from '../../db/tableName';
import { createNewUser } from '../../firebase/auth';
import { setData } from '../../firebase/firebase';
import { Input } from '../UI/Input/Input';
import { Select } from '../UI/Select/Select';
import { setMinLengthRequired, isValidEmail, errorTitle, isValidAge, setScoreValue, getCurrentDateUTC } from '../Validation/validationHelpers';
import { Button } from '../UI/Buttons/Button/Button';
import { toLowerCaseFirstLetter, toTrim, isValidFormCreateNewUsers } from './modalHelpers/helpers';
import classes from './ModalRegisterNewUser.module.css';




const selectData = [
  { title: 'Direction', options: ['Frontend', 'Java', '.Net'] },
  { title: 'Sex', options: ['Male', 'Female'] },
  { title: 'Role', options: ['Admin', 'Mentor', 'Student'] },
];

export class ModalRegisterNewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /*       fullName: '',
            email: '',
            direction: '',
            sex: null,
            education: '',
            age: null,
            universityAverageScore: null,
            mathScore: null,
            address: '',
            mobilePhone: null,
            skype: '',
            startDate: null,
            role: '', */    /* not tested this case */
      touched: {
        fullName: false,
        email: false,
        direction: false,
        sex: false,
        education: false,
        age: false,
        universityAverageScore: false,
        mathScore: false,
        address: false,
        mobilePhone: false,
        skype: false,
        startDate: false,
        role: false,
      },
    };
  }

  componentDidMount() {
    const { editData } = this.props;
    console.log(editData);
    this.setState({
      fullName: editData.fullName || '',
      email: editData.email || '',
      direction: editData.direction || '',
      sex: editData.sex || null,
      education: editData.education || '',
      age: editData.age || null,
      universityAverageScore: editData.universityAverageScore || null,
      mathScore: editData.mathScore || null,
      address: editData.address || '',
      mobilePhone: editData.mobilePhone || null,
      skype: editData.skype || '',
      startDate: editData.startDate || null,
      role: editData.role || '',
    })
  }

  getInputsData = () => {

    const data = this.state


    return ([{ title: 'Full Name', type: 'text', isValid: setMinLengthRequired(data.fullName, 2), errorMessage: errorTitle(2).minLength },
    { title: 'Email', type: 'email', isValid: isValidEmail(data.email), errorMessage: 'Invalid email' },
    { title: 'Education', type: 'text', isValid: setMinLengthRequired(data.education, 3), errorMessage: errorTitle(3).minLength },
    { title: 'Age', type: 'number', isValid: isValidAge(data.age), errorMessage: 'Age should be between 1 to 100' },
    { title: 'University Average Score', type: 'number', isValid: setScoreValue(+data.universityAverageScore, 0, 100), errorMessage: 'Score should be between 0 to 100' },
    { title: 'Math Score', type: 'number', isValid: setScoreValue(+data.mathScore, 0, 100), errorMessage: 'Score should be between 0 to 100' },
    { title: 'Address', type: 'text', isValid: setMinLengthRequired(data.address, 3) },
    { title: 'Mobile Phone', type: 'number', isValid: setMinLengthRequired(data.mobilePhone, 12), errorMessage: 'Number should has 12 numbers' },
    { title: 'Skype', type: 'text', isValid: setMinLengthRequired(data.skype, 3) },
    { title: 'Start Date', type: 'date', isValid: getCurrentDateUTC(data.startDate), errorMessage: 'Date should not be in past    ' },
    ])
  }

  getValue = (value) => {
    const { touched } = this.state;
    const el = toLowerCaseFirstLetter(toTrim(value.target.attributes[1].nodeValue));
    this.setState({ [el]: value.target.value, touched: { ...touched, [el]: true } });
  };

  renderInputs = () => {
    const { touched } = this.state;
    const data = this.state;
    return this.getInputsData().map((inputItem) => {
      const el = toLowerCaseFirstLetter(toTrim(inputItem.title));
      return (
        <Input
          value={data[el]}
          key={inputItem.title}
          onChange={this.getValue}
          title={inputItem.title}
          type={inputItem.type || 'text'}
          isValid={!touched[el] || inputItem.isValid}
          errorMessage={inputItem.errorMessage}
        />
      );
    });
  };

  renderSelects = () => {
    const data = this.state;
    return selectData.map((selectItem) => {
      const el = toLowerCaseFirstLetter(toTrim(selectItem.title));
      return (
        <Select
          value={data[el]}
          title={selectItem.title}
          key={selectItem.title}
          onChange={this.getValue}
          options={selectItem.options}
        />
      );
    });
  };

  createUser = async () => {
    const { onClose } = this.props;
    const userDateObj = { ...this.state };
    const { email } = this.state;
    await setData(MEMBERS, userDateObj, email);
    await createNewUser(email, email);

    onClose();
  };



  render() {
    const { isOpen, onClose } = this.props;
    const usersDataFields = { ...this.state };
    delete usersDataFields.touched;

    console.log(!isValidFormCreateNewUsers(usersDataFields));

    return (
      <div className={`${classes.ModalRegisterNewUser} ${isOpen ? classes.open : classes.close}`}>
        <h4>Create new user</h4>
        <div className={classes.container}>{this.renderInputs()}</div>
        <div className={classes.container}> {this.renderSelects()}</div>
        <div className={classes.buttonGroup}>
          <Button onClick={this.createUser} disabled={!isValidFormCreateNewUsers(usersDataFields)}>
            Save
          </Button>
          <Button onClick={onClose} className={classes.CancelButton}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}

ModalRegisterNewUser.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  editData: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired,
    education: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    universityAverageScore: PropTypes.string.isRequired,
    mathScore: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    mobilePhone: PropTypes.number.isRequired,
    skype: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }),
};

ModalRegisterNewUser.defaultProps = {
  editData: null,
};
