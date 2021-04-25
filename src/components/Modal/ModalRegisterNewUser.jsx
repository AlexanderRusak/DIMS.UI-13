import PropTypes from 'prop-types';
import { Component } from 'react';
import { MEMBERS } from '../../db/tableName';
import { createNewUser } from '../../firebase/auth';
import { setData } from '../../firebase/firebase';
import { Input } from '../UI/Input/Input';
import { Select } from '../UI/Select/Select';
import { Button } from '../UI/Buttons/Button/Button';
import { toLowerCaseFirstLetter, toTrim } from './modalHelpers/helpers';
import classes from './ModalRegisterNewUser.module.css';

const inputsData = [
  { title: 'Full Name' },
  { title: 'Email', type: 'email' },
  { title: 'Education' },
  { title: 'Age', type: 'number' },
  { title: 'University Average Score', type: 'number' },
  { title: 'Math Score', type: 'number' },
  { title: 'Address' },
  { title: 'Mobile Phone', type: 'number' },
  { title: 'Skype' },
  { title: 'Start Date', type: 'date' },
];

const selectData = [
  { title: 'Direction', options: ['Frontend', 'Java', '.Net'] },
  { title: 'Sex', options: ['Male', 'Female'] },
  { title: 'Role', options: ['Admin', 'Mentor', 'Student'] },
];

export class ModalRegisterNewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: props.editData.fullName || '',
      email: props.editData.email || '',
      direction: props.editData.direction || '',
      sex: props.editData.sex || null,
      education: props.editData.education || '',
      age: props.editData.age || null,
      universityAverageScore: props.editData.universityAverageScore || null,
      mathScore: props.editData.mathScore || null,
      address: props.editData.address || '',
      mobilePhone: props.editData.mobilePhone || null,
      skype: props.editData.skype || '',
      startDate: props.editData.startDate || null,
      role: props.editData.role || '',
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

  getIsValid = () => {
    const {
      fullName,
      email,
      sex,
      direction,
      education,
      age,
      universityAverageScore,
      mathScore,
      address,
      mobilePhone,
      skype,
      startDate,
      role,
    } = this.state;
    return !!(
      fullName &&
      email &&
      sex &&
      direction &&
      education &&
      age &&
      universityAverageScore &&
      mathScore &&
      address &&
      mobilePhone &&
      skype &&
      startDate &&
      role
    );
  }; 

  getValue = (value) => {
    /* value.target.attributes[1].nodeValue */

    const el = toLowerCaseFirstLetter(toTrim(value.target.attributes[1].nodeValue));
    this.setState({ [el]: value.target.value, touched: { [el]: true } });
  };

  renderInputs = (data) => {
    const { touched } = this.state;
    return inputsData.map((inputItem) => {
      const el = toLowerCaseFirstLetter(toTrim(inputItem.title));
      return (
        <Input
          value={data[el]}
          key={inputItem.title}
          onChange={this.getValue}
          title={inputItem.title}
          type={inputItem.type || 'text'}
          isValid={!touched[el] || data[el] /* && el === 'Email' && validateEmail(data.Email) */}
        />
      );
    });
  };

  renderSelects = () => {
    return selectData.map((selectItem) => {
      return (
        <Select
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
    await createNewUser(email, '          ');

    onClose();
  };

  render() {
    const { isOpen, onClose } = this.props;
    console.log(this.state);
    return (
      <div className={`${classes.ModalRegisterNewUser} ${isOpen ? classes.open : classes.close}`}>
        <h4>Create new user</h4>
        <div className={classes.container}>{this.renderInputs(this.state)}</div>
        <div className={classes.container}> {this.renderSelects()}</div>
        <div className={classes.buttonGroup}>
          <Button onClick={this.createUser} disabled={!this.getIsValid()}>
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
