import PropTypes from 'prop-types';
import { Component } from 'react';
import { createNewUser } from '../../firebase/auth';
import { setData, getData } from '../../firebase/firebase';
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
    console.log(element.target.value, value);
    this.setState({ [element]: value });
    console.log(this.state, 'state');
  };

  createUser = async () => {
    const userDateObj = { ...this.state };
    const { Email: email } = this.state;
    console.log(userDateObj);

    const getAllData = await getData('members');
    console.log(getAllData);
    const id = getAllData.length || 0;
    userDateObj.UserId = id;
    console.log(userDateObj);
    const data = await setData('members', [...getAllData, userDateObj]);
    console.log(data);
    const response = await createNewUser(email, '          ');
    console.log(response);
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
        <Input onChange={(event) => this.getValue(event, 'FullName')} title='Full Name' />
        <Input onChange={this.getValue} type='email' title='Email' />
        <Select value={Direction} onChange={this.getValue} title='Direction' options={['Java', '.Net', 'FrontEnd']} />
        <Select value={Sex} onChange={this.getValue} title='Sex' options={['Male', 'Female']} />
        <Input onChange={this.getValue} title='Education' />
        <Input onChange={this.getValue} style={{ width: '100px' }} title='Age' />
        <Input onChange={this.getValue} style={{ width: '100px' }} title='University Average Score' />
        <Input onChange={this.getValue} style={{ width: '100px' }} title='Math Score' />
        <Input onChange={this.getValue} title='Address' />
        <Input onChange={this.getValue} style={{ width: '250px' }} type='number' title='Mobile Phone' />
        <Input onChange={this.getValue} type='number' title='Skype' />
        <Input onChange={this.getValue} type='date' title='Start Date' />
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
