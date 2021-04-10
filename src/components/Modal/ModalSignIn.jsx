import { Component } from 'react';
import { Input } from '../UI/Input/Input';
import { Button } from '../UI/Buttons/Button/Button';
import classes from './ModalSignIn.module.css';
import { signIn } from '../../firebase/auth';

export class ModalSignIn extends Component {
  state = {
    Email: '',
    Password: '',
  };

  signIn = async () => {
    const { Email, Password } = this.state;
    const response = await signIn(Email, Password);
    console.log(response);
    if (response) window.open('/members');
  };

  getValue = (element, value) => {
    this.setState({ [element]: value });
  };

  render() {
    return (
      <div className={classes.ModalSignIn}>
        <h4>Wellcome to DIMS</h4>
        <Input onChange={this.getValue} title='Email' />
        <Input onChange={this.getValue} title='Password' />
        <Button onClick={this.signIn}>
          <p>Sign in</p>
        </Button>
      </div>
    );
  }
}
