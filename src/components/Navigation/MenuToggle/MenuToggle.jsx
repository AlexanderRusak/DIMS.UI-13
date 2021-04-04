import PropTypes from 'prop-types';
import classes from './MenuToggle.module.css';

const MenuToggle = (props) => {
  const cls = [classes.MenuToggle, 'fa'];
  const { onToggle, isOpen, onKeyPress } = props;
  console.log(props);
  if (isOpen) {
    cls.push('fa-times');
    cls.push(classes.open);
  } else {
    cls.push('fa-bars');
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
    />
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
