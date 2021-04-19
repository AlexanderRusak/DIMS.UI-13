import PropTypes from 'prop-types';
import { FaRegTimesCircle, FaBars } from 'react-icons/fa';
import classes from './MenuToggle.module.css';

const MenuToggle = (props) => {
  const cls = [classes.MenuToggle];
  const { onToggle, isOpen, onKeyPress } = props;
  if (isOpen) {
    cls.push(classes.open);
  }

  return (
    <i
      tabIndex={0}
      aria-label='button'
      type='button'
      role='button'
      className={cls.join(' ')}
      onClick={onToggle}
      onKeyPress={onKeyPress}
    >
      {isOpen ? <FaRegTimesCircle /> : <FaBars />}
    </i>
  );
};
MenuToggle.propTypes = {
  onToggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onKeyPress: PropTypes.func,
};
MenuToggle.defaultProps = {
  onKeyPress: PropTypes.func,
};

export default MenuToggle;
