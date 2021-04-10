import PropTypes from 'prop-types';
import classes from './Select.module.css';

export const Select = ({ title, options, value, onChange, name }) => {
  return (
    <div className={classes.Select}>
      <label htmlFor={name}>{title}</label>
      <select name={name} value={value} onChange={(e) => onChange(title.replace(/\s/g, ''), e.target.value)}>
        <option value=''>Please select...</option>
        {options.map((el) => (
          <option value={el} key={el}>
            {el}
          </option>
        ))}
      </select>
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.instanceOf(Array).isRequired,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
