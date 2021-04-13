import PropTypes from 'prop-types';
import { Component } from 'react';
import { createNewUser } from '../../firebase/auth';
import { setData, getData } from '../../firebase/firebase';
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

  createUser = async () => {
    const userDateObj = { ...this.state };
    const { Email: email } = this.state;
    const getAllData = await getData('members');
    const id = getAllData.length || 0;
    userDateObj.UserId = id;
    await setData('members', [...getAllData, userDateObj]);
    const { user } = await createNewUser(email, '          ');
    const getAllMembers = await getData('members');
    const current = getAllMembers.find((userData) => userData.UserId === id);
    current.UserId = user.uid;
    getAllMembers[id] = current;
    await setData('members', getAllMembers);
  };

  render() {
    const { isOpen, onClose } = this.props;
    const { Direction, Sex } = this.state;

    return (
      <div className={`${classes.ModalRegisterNewUser} ${isOpen ? classes.open : classes.close}`}>
        <h4>Create new user</h4>
        <div className={classes.container}>{this.renderInputs()}</div>
        <Select
          value={Direction}
          onChange={(event) => this.getValue(event, 'Direction')}
          title='Direction'
          options={['Java', '.Net', 'FrontEnd']}
        />
        <Select
          value={Sex}
          onChange={(event) => this.getValue(event, 'Sex')}
          title='Sex'
          options={['Male', 'Female']}
        />
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
