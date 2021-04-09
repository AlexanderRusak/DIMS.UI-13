import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';
import logo from '../../images/logo.png';

export const Header = () => {
  return (
    <div className={classes.Header}>
      <NavLink to='/'>
        <img className={classes.logo} src={logo} alt='logo' />
      </NavLink>
    </div>
  );
};
