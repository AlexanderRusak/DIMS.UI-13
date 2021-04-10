import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Input } from '../UI/Input/Input';
import { Button } from '../UI/Buttons/Button/Button';
import classes from './ModalSignIn.module.css';
import { signIn } from '../../firebase/auth';

export class ModalSignIn extends Component {
  state = {
    Email: '',
    Password: '',
    isValid: false,
  };

  signIn = async () => {
    const { Email, Password } = this.state;
    const response = await signIn(Email, Password);
    console.log(response);
    if (response) {
      this.setState(() => {
        return {
          isValid: true,
        };
      });
    }
  };

  getValue = (element, value) => {
    this.setState({ [element]: value });
  };

  render() {
    const { isValid } = this.state;
    return (
      <div className={classes.ModalSignIn}>
        <h4>Wellcome to DIMS</h4>
        <Input onChange={this.getValue} title='Email' />
        <Input onChange={this.getValue} title='Password' />
        <Button onClick={this.signIn}>
          <p>Sign in</p>
        </Button>
        {isValid && <Redirect to='/members' />}
      </div>
    );
  }
}
