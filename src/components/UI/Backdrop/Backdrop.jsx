import PropTypes from 'prop-types';
import noop from '../../../shared/noop';
import { defaultProps } from '../../../defaultValues/default';
import classes from './Backdrop.module.css';

const Backdrop = ({ onClick }) => {
  return (
    <div
      tabIndex={defaultProps.tabIndex}
      aria-label={defaultProps.ariaLabel}
      type={defaultProps.type}
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
