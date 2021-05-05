import PropTypes from 'prop-types';
import classes from './Label.module.css';

export const Label = ({ value, title }) => {
  return (
    <div className={classes.Label}>
      <label className={classes.title} htmlFor='input'>
        {title}
      </label>
      <label className={classes.value} htmlFor='input'>
        {value}
      </label>
    </div>
  );
};

Label.propTypes = {
  value: PropTypes.string,
  title: PropTypes.string,
};
Label.defaultProps = {
  value: '',
  title: '',
};
