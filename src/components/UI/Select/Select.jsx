import PropTypes from 'prop-types';
import classes from './Select.module.css';

export const Select = ({ title, options, value, onChange, name }) => {
  return (
    <div className={classes.Select}>
      <label htmlFor={name}>{title}</label>
      <select id={title} name={name} value={value} onChange={onChange}>
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
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  value: PropTypes.node.isRequired,
};

Select.defaultProps = {
  title: 'title',
  name: '',
};
