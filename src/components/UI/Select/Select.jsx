import PropTypes from 'prop-types';
import classes from './Select.module.css';

export const Select = ({ title, options, value, onChange, readonly }) => {
  return (
    <div className={classes.Select}>
      <label htmlFor={title}>{title}</label>
      <select id={title} name={title} value={value} onChange={onChange} disabled={readonly}>
        <option value=''>Please select...</option>
        {options.map((el) => (
          <option name={value} value={el} key={el} >
            {el}
          </option>
        ))}
      </select>
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  readonly: PropTypes.bool,
  title: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.node.isRequired,
};

Select.defaultProps = {
  title: 'title',
  readonly: false,
};
