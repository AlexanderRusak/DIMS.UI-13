import PropTypes from 'prop-types';
import { Component } from 'react';
import { MEMBERS } from '../../db/tableName';
import { validateEmail } from '../Auth/Auth';
import { createNewUser } from '../../firebase/auth';
import { setData } from '../../firebase/firebase';
import { Input } from '../UI/Input/Input';
import { Select } from '../UI/Select/Select';
import { Button } from '../UI/Buttons/Button/Button';
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
      FullName: '',
      Email: '',
      Direction: '',
      Sex: null,
      Education: '',
      Age: null,
      UniversityAverageScore: null,
      MathScore: null,
      Address: '',
      MobilePhone: null,
      Skype: '',
      StartDate: null,
      Role: '',
      touched: {
        FullName: false,
        Email: false,
        Direction: false,
        Sex: false,
        Education: false,
        Age: false,
        UniversityAverageScore: false,
        MathScore: false,
        Address: false,
        MobilePhone: false,
        Skype: false,
        StartDate: false,
        Role: false,
      },
    };
  }

  getIsValid = () => {
    const {
      FullName,
      Email,
      Sex,
      Direction,
      Education,
      Age,
      UniversityAverageScore,
      MathScore,
      Address,
      MobilePhone,
      Skype,
      StartDate,
      Role,
    } = this.state;
    return !!(
      FullName &&
      Email &&
      Sex &&
      Direction &&
      Education &&
      Age &&
      UniversityAverageScore &&
      MathScore &&
      Address &&
      MobilePhone &&
      Skype &&
      StartDate &&
      Role
    );
  };

  getValue = (value, element) => {
    const el = element.replace(/\s/g, '');
    this.setState({ [el]: value.target.value, touched: { [el]: true } });
  };

  renderInputs = (data) => {
    const { touched } = this.state;
    return inputsData.map((inputItem) => {
      const el = inputItem.title.replace(/\s/g, '');
      console.log(el);
      console.log(validateEmail(data.Email));
      return (
        <Input
          key={inputItem.title.toString()}
          onChange={(event) => this.getValue(event, inputItem.title.trim())}
          title={inputItem.title}
          type={inputItem.type || 'text'}
          isError={!touched[el] || (!!data[el] && el === 'Email' && validateEmail(data.Email))}
        />
      );
    });
  };

  renderSelects = () => {
    return selectData.map((selectItem) => {
      return (
        <Select
          title={selectItem.title}
          key={selectItem.title.toString()}
          onChange={(event) => this.getValue(event, selectItem.title.trim())}
          options={selectItem.options}
        />
      );
    });
  };

  createUser = async () => {
    const { onClose } = this.props;
    const userDateObj = { ...this.state };
    const { Email: email } = this.state;
    await setData(MEMBERS, userDateObj, email);
    await createNewUser(email, '          ');

    onClose();
  };

  render() {
    const { isOpen, onClose } = this.props;

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
};
