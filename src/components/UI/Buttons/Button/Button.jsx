import PropTypes from 'prop-types';
import classes from './Button.module.css';
import noop from '../../../../shared/noop';

export const Button = ({ children, onClick, disabled, ...restProps }) => {
  return (
    <button className={classes.Button} type='button' onClick={onClick} {...restProps} disabled={disabled}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  disabled: PropTypes.bool,
};
Button.defaultProps = {
  onClick: noop,
  children: null,
  disabled: false,
};
