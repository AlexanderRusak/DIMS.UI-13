import { Component } from 'react';
/* import PropTypes from 'prop-types'; */
/* import { Redirect } from 'react-router-dom'; */
import { Input } from '../UI/Input/Input';
import { Button } from '../UI/Buttons/Button/Button';
import { isFormValid } from './modalHelpers/helpers';
import classes from './ModalSignIn.module.css';
import { signIn } from '../../firebase/auth';
import { validateControl } from '../Auth/Auth';
import Alert from '../UI/Alert/Alert';

export class ModalSignIn extends Component {

  state = {
    isValid: false,
    response: null,
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

  errorHandler = () => {
    this.setState({
      error: true,
    });
    setTimeout(() => {
      this.setState({
        error: false,
      });
    }, 5000);
  };

  signIn = async () => {
    const { formControls } = this.state;
/*     const { test } = this.props; */
    try {
      const response = await signIn(formControls.email.value, formControls.password.value);
      console.log(response);
/*       test(); */
      if (response) {

        this.setState({
          response,
        });
      } else this.errorHandler();
    } catch (err) {
      this.errorHandler();
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

    this.setState({
      formControls: form,
      isValid: isFormValid(form),
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
          isValid={!!controlName}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  }

  render() {
    const { isValid, error, response } = this.state;

    console.log(response && response.user.email);

    return (
      <>
        {error && <Alert text='Incorrect mail or password!' />}
        <div className={classes.ModalSignIn}>
          <h4>Wellcome to DIMS</h4>
          {this.renderInputs()}
          <Button typeButton='primary' onClick={this.signIn} disabled={!isValid}>
            <p>Sign in</p>
          </Button>
          {/*           {response && <Redirect to='/members' />} */}
        </div>
      </>
    );
  }
}
/* 
ModalSignIn.propTypes = {
  test: PropTypes.func.isRequired,
}

 */