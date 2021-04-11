import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Input } from '../UI/Input/Input';
import { Button } from '../UI/Buttons/Button/Button';
import classes from './ModalSignIn.module.css';
import { signIn } from '../../firebase/auth';
import { validateControl } from '../Auth/Auth';
import Alert from '../UI/Alert/Alert';

export class ModalSignIn extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        title: 'Email',
        errorMessage: 'Enter correct email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: '',
        type: 'password',
        title: 'Password',
        errorMessage: 'Input correct password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  signIn = async () => {
    const { Email, Password } = this.state;
    const response = await signIn(Email, Password);

    if (response) {
      this.setState({
        isValid: true,
      });
    } else {
      this.setState({
        error: true,
        Email: '',
        Password: '',
      });
      setTimeout(() => {
        this.setState({
          error: false,
        });
      }, 5000);
    }
  };

  onChangeHandler = (event, controlName) => {
    const { formControls } = this.state;

    const form = { ...formControls };
    const control = { ...form[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);

    form[controlName] = control;

    let isValid = true;
    Object.keys(form).forEach((name) => {
      isValid = form[name].valid && isValid;
    });

    this.setState({
      formControls: form,
      isFormValid: isValid,
    });
  };

  renderInputs() {
    const { formControls } = this.state;
    return Object.keys(formControls).map((controlName) => {
      const control = formControls[controlName];
      return (
        <Input
          key={controlName}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          title={control.title}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  }

  render() {
    const { isValid, error, isFormValid } = this.state;
    return (
      <>
        {error && <Alert text='Something went wrong!' />}
        <div className={classes.ModalSignIn}>
          <h4>Wellcome to DIMS</h4>
          {this.renderInputs()}
          <Button onClick={this.signIn} disabled={!isFormValid}>
            <p>Sign in</p>
          </Button>
          {isValid && <Redirect to='/members' />}
        </div>
      </>
    );
  }
}
