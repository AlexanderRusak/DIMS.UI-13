import PropTypes from 'prop-types';
import { FaRegTimesCircle, FaBars } from 'react-icons/fa';
import noop from '../../../shared/noop';
import classes from './MenuToggle.module.css';

const MenuToggle = ({ onToggle, isOpen }) => {
  return (
    <i
      tabIndex={0}
      aria-label='button'
      type='button'
      role='button'
      className={`${classes.MenuToggle} ${isOpen ? classes.open : ''}`}
      onClick={onToggle}
      onKeyPress={noop}
    >
      {isOpen ? <FaRegTimesCircle /> : <FaBars />}
    </i>
  );
};
MenuToggle.propTypes = {
  onToggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default MenuToggle;
