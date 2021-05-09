import PropTypes from 'prop-types';
import { ModalSignIn } from '../../components/Modal/ModalSignIn';
import classes from './SignIn.module.css';

export const SignIn = ({ onClick }) => {
console.log('signIn');
  return (
  
    <div className={classes.SignIn}>
      <ModalSignIn onClick={onClick} />
    </div>
  );
};

SignIn.propTypes = {
  onClick: PropTypes.func.isRequired
}
