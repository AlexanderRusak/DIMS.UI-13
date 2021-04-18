import PropTypes from 'prop-types';
import classes from './Label.module.css';

export const Label = ({ value }) => {
  return (
    <div className={classes.Label}>
      <label htmlFor='input'>{value}</label>
    </div>
  );
};

Label.propTypes = {
  value: PropTypes.string,
};
Label.defaultProps = {
  value: '',
};
