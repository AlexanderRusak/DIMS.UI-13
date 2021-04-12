import PropTypes from 'prop-types';
import { Component } from 'react';
/* import { createNewUser } from '../../firebase/auth'; */
import { /*  setData, */ getData } from '../../firebase/firebase';
import { Input } from '../UI/Input/Input';
import { Select } from '../UI/Select/Select';
import { Button } from '../UI/Buttons/Button/Button';
import classes from './ModalRegisterNewUser.module.css';

const inputsData = [
  'Full Name',
  'Email',
  'Education',
  'Age',
  'Universtity Avarage Score',
  'Math Score',
  'Address',
  'Mobile Phone',
  'Skype',
  'Start Date',
];

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

  getValue = (value, element) => {
    this.setState({ [element]: value });
    console.log(element, value.target.value);
  };

  renderInputs = () => {
    return inputsData.map((inputItem) => {
      return (
        <Input
          key={inputItem.toString()}
          onChange={(event) => this.getValue(event, inputItem.trim())}
          title={inputItem}
        />
      );
    });
  };

  createUser = async () => {
    const userDateObj = { ...this.state };
    /*    const { Email: email } = this.state; */
    const getAllData = await getData('members');

    const id = getAllData.length || 0;
    userDateObj.UserId = id;

    /* const data = await setData('members', [...getAllData, userDateObj]);

        const response = await createNewUser(email, '          '); */
  };

  render() {
    const { isOpen, onClose } = this.props;
    const { Direction, Sex } = this.state;

    return (
      <div className={`${classes.ModalRegisterNewUser} ${isOpen ? classes.open : classes.close}`}>
        <h4>Create new user</h4>
        <div className={classes.container}>{this.renderInputs()}</div>
        <Select value={Direction} onChange={this.getValue} title='Direction' options={['Java', '.Net', 'FrontEnd']} />
        <Select value={Sex} onChange={this.getValue} title='Sex' options={['Male', 'Female']} />
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
