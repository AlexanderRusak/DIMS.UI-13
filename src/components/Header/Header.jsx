import { NavLink } from 'react-router-dom';
import classes from '../StylesConstant/mainStyle.module.css';
import logo from '../../images/logo.png';

export const Header = () => {
  return (
    <div className={classes.Main}>
      <NavLink to='/'>
        <img className={classes.logo} src={logo} alt='logo' />
      </NavLink>
    </div>
  );
};
