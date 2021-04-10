import { ModalSignIn } from '../../components/Modal/ModalSignIn';
import classes from './SignIn.module.css';

export const SignIn = () => {
  return (
    <div className={classes.SignIn}>
      <ModalSignIn />
    </div>
  );
};
