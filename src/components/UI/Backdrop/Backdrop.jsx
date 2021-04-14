import PropTypes from 'prop-types';
import classes from './Backdrop.module.css';

const Backdrop = ({ onClick, onKeyPress }) => {
  return (
    <div
      tabIndex={0}
      aria-label='button'
      type='button'
      role='button'
      className={classes.Backdrop}
      onClick={onClick}
      onKeyPress={onKeyPress}
    />
  );
};

Backdrop.propTypes = {
  onClick: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
};
Backdrop.defaultProps = {
  onKeyPress: PropTypes.func,
};
export default Backdrop;
