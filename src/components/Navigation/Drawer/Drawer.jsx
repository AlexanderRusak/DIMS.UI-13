import PropTypes from 'prop-types';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { RoleContext } from '../../../hoc/RoleContext/RoleContext';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './Drawer.module.css';

const links = [
  { to: '/members', label: 'Members', exact: true },
  { to: '/tasks', label: 'Create Task', exact: true },
  { to: '/members-tasks', label: 'My Tasks', exact: true },
];

export class Drawer extends Component {


  clickHandler = () => {
    console.log("signOut");
    localStorage.setItem('role', '');
    localStorage.setItem('isLogged', JSON.stringify(false));
    localStorage.setItem('email', '')
  };

  renderLinks = () => {
    const { onClose } = this.props;
    const { role } = this.context;
    const filteredLinks = role === 'member' ?
      links.filter(link => link.label !== 'Members' && link.label !== 'Create Task') : links.filter(link => link.label !== 'My Tasks');

    return filteredLinks.map((link) => {
      return (
        <li key={link.label}>
          <NavLink to={link.to} exact={link.exact} activeClassName={classes.active} onClick={onClose} >
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
          <ul>
            {this.renderLinks()}
            <li >
              <a onClick={this.clickHandler} href='/signin' className={classes.active}>Sign Out</a>
            </li>
          </ul>
        </nav>
        { isOpen ? <Backdrop onClick={onClose} /> : null}
      </>
    );
  }

};

Drawer.contextType = RoleContext;

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

