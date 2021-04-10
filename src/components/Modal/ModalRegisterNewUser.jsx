import PropTypes from 'prop-types';
import { Component } from 'react';
import { createNewUser, signIn } from '../../firebase/auth';
import { Input } from '../UI/Input/Input';
import { Select } from '../UI/Select/Select';
import { Button } from '../UI/Buttons/Button/Button';
import classes from './ModalRegisterNewUser.module.css';

export class ModalRegisterNewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserId: '',
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
    };
  }

  getValue = (element, value) => {
    console.log(element, value);
    this.setState({ [element]: value });
    console.log(this.state, 'state');
  };

  createUser = async () => {
    const userDateObj = { ...this.state };
    const { Email: email } = this.state;
    console.log(userDateObj);
    const response = await createNewUser(email, '          ');
    console.log(response);
  };

  testLogin = async () => {
    const { Email } = this.state;
    const res = await signIn(Email, '12345678');
    console.log(res);
  };

  render() {
    const { isOpen, onClose } = this.props;
    const { Direction, Sex } = this.state;
    const cls = [classes.ModalRegisterNewUser];
    if (isOpen) {
      cls.push(classes.open);
    } else {
      cls.push(classes.close);
    }
    return (
      <div className={cls.join(' ')}>
        <h4>Create new user</h4>
        <Input onChange={this.getValue} title='Full Name' />
        <Input onChange={this.getValue} type='email' title='Email' />
        <Select value={Direction} onChange={this.getValue} title='Direction' options={['Java', '.Net', 'FrontEnd']} />
        <Select value={Sex} onChange={this.getValue} title='Sex' options={['Male', 'Female']} />
        <Input onChange={this.getValue} style={{ width: '100px' }} title='University average score' />
        <Input onChange={this.getValue} style={{ width: '100px' }} title='Math score' />
        <Input onChange={this.getValue} title='Address' />
        <Input onChange={this.getValue} style={{ width: '250px' }} type='number' title='Mobile Phone' />
        <Input onChange={this.getValue} type='number' title='Skype' />
        <Input onChange={this.getValue} type='date' title='Start Date' />
        <div className={classes.buttonGroup}>
          <Button onClick={this.createUser} className={classes.SaveButton}>
            Save
          </Button>
          <Button onClick={onClose} className={classes.CancelButton}>
            {' '}
            Cancel
          </Button>
          <Button onClick={this.testLogin} className={classes.SaveButton}>
            {' '}
            Test
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
