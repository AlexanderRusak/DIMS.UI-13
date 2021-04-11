import PropTypes from 'prop-types';
import classes from './Input.module.css';

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched;
}

export const Input = (props) => {
  const { type, title, value, onChange, errorMessage } = props;
  const inputType = type || 'text';
  const cls = [classes.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(props)) {
    cls.push(classes.invalid);
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{title}</label>
      <input type={inputType} id={htmlFor} value={value} onChange={onChange} />

      {isInvalid(props) ? <span>{errorMessage || 'Введите верное значение'}</span> : null}
    </div>
  );
};
Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  errorMessage: PropTypes.string,
};
Input.defaultProps = {
  title: 'title',
  type: 'text',
  errorMessage: null,
};
