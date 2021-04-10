import PropTypes from 'prop-types';
import classes from './Input.module.css';

export const Input = ({ title, type, onClick, onChange, ...restProps }) => (
  <div className={classes.Input}>
    <label htmlFor={title}>{title}</label>
    <input
      onChange={(e) => onChange(title.replace(/\s/g, ''), e.target.value)}
      id={title}
      type={type}
      onClick={onClick}
      {...restProps}
    />
  </div>
);

Input.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string,
  type: PropTypes.string,
};
Input.defaultProps = {
  onClick: null,
  children: null,
  title: 'title',
  type: 'text',
  onChange: null,
};
