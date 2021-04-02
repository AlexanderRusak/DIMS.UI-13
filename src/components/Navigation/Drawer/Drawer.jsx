import { Component } from 'react';
import PropTypes from 'prop-types';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './Drawer.module.css';

const links = ['Members', 'Members Progress', 'Member Tasks'];

export default class Drawer extends Component {
  renderLinks() {
    const { onChose, onKeyPress } = this.props;

    return links.map((link, index) => {
      return (
        <li>
          <div
            tabIndex={0}
            aria-label='button'
            type='button'
            role='button'
            onKeyPress={onKeyPress}
            onClick={() => onChose(index)}
            key={link.indexOf()}
          >
            <p>{link}</p>
          </div>
        </li>
      );
    });
  }

  render() {
    const { isOpen, onClose } = this.props;
    const cls = [classes.Drawer];
    if (!isOpen) {
      cls.push(classes.close);
    }

    return (
      <>
        <nav className={cls.join(' ')}>
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
  onChose: PropTypes.func,
  onKeyPress: PropTypes.func,
};
Drawer.defaultProps = {
  onKeyPress: PropTypes.func,
  onChose: PropTypes.func,
};
