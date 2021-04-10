/* import { createNewUser } from '../../firebase/auth'; */
import PropTypes from 'prop-types';
import { Input } from '../UI/Input/Input';
import classes from './ModalRegisterNewUser.module.css';

export const ModalRegisterNewUser = ({ isOpen }) => {
  /*   const email = 'rusak.alexander2017@yandex.ru';
      const password = '1234567';
      const response = await createNewUser(email, password)
      console.log(response); */
  const cls = [classes.ModalRegisterNewUser];
  if (isOpen) {
    cls.push(classes.open);
  } else {
    cls.push(classes.close);
  }
  return (
    <div className={cls.join(' ')}>
      <Input title='Full Name' />
      <Input type='email' title='Email' />
      <Input title='Direction' />
      <Input title='Sex' />
      <Input style={{ width: '100px' }} title='University average score' />
      <Input style={{ width: '100px' }} title='Math score' />
      <Input title='Address' />
      <Input style={{ width: '250px' }} type='number' title='Mobile Phone' />
      <Input type='number' title='Skype' />
      <Input type='date' title='Mobile Phone' />
    </div>
  );
};

ModalRegisterNewUser.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};
