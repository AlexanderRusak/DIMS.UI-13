import PropTypes from 'prop-types';
import { FaRegTimesCircle, FaBars } from 'react-icons/fa';
import { defaultProps } from '../../../defaultValues/default';
import noop from '../../../shared/noop';
import classes from './MenuToggle.module.css';

const MenuToggle = ({ onToggle, isOpen }) => {
  return (
    <i
      tabIndex={defaultProps.tabIndex}
      aria-label={defaultProps.ariaLabel}
      type={defaultProps.type}
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
