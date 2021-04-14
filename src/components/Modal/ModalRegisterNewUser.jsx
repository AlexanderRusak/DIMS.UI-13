import PropTypes from 'prop-types';
import { Component } from 'react';
/* import { createNewUser } from '../../firebase/auth'; */
import { setData /* , getData  */ } from '../../firebase/firebase';
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
    };
  }

  getValue = (value, element) => {
    this.setState({ [element.replace(/\s/g, '')]: value.target.value });
  };

  renderInputs = () => {
    return inputsData.map((inputItem) => {
      return (
        <Input
          key={inputItem.title.toString()}
          onChange={(event) => this.getValue(event, inputItem.title.trim())}
          title={inputItem.title}
          type={inputItem.type || 'text'}
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
    console.log(userDateObj);
    const response = await setData('members', userDateObj, email);
    /*  await createNewUser(email, '          '); */
    console.log(response);
    onClose();
  };

  render() {
    const { isOpen, onClose } = this.props;

    return (
      <div className={`${classes.ModalRegisterNewUser} ${isOpen ? classes.open : classes.close}`}>
        <h4>Create new user</h4>
        <div className={classes.container}>{this.renderInputs()}</div>
        <div className={classes.container}> {this.renderSelects()}</div>
        <div className={classes.buttonGroup}>
          <Button onClick={this.createUser} className={classes.SaveButton}>
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
