import PropTypes from 'prop-types';
import noop from '../../../shared/noop';
import classes from './Backdrop.module.css';

const Backdrop = ({ onClick }) => {
  return (
    <div
      tabIndex={0}
      aria-label='button'
      type='button'
      role='button'
      className={classes.Backdrop}
      onClick={onClick}
      onKeyPress={noop}
    />
  );
};

Backdrop.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Backdrop;
