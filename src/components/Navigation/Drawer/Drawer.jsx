import { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './Drawer.module.css';

const links = [
  { to: '/members', label: 'Members', exact: true },
  { to: '/signIn', label: 'Sign Out', exact: true },
];

export default class Drawer extends Component {
  clickHandler = () => {
    const { onClose } = this.props;
    onClose();
  };

  renderLinks = () => {
    return links.map((link) => {
      return (
        <li key={link.label}>
          <NavLink to={link.to} exact={link.exact} activeClassName={classes.active} onClick={this.clickHandler}>
            {link.label}
          </NavLink>
        </li>
      );
    });
  };

  render() {
    const { isOpen, onClose } = this.props;

    return (
      <>
        <nav className={`${classes.Drawer} ${!isOpen ? classes.close : ''}`}>
          <ul>{this.renderLinks()}</ul>
        </nav>
        {isOpen ? <Backdrop onClick={onClose} /> : null}
      </>
    );
  }
}
Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
