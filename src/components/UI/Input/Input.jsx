import PropTypes from 'prop-types';
import classes from './Input.module.css';

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched;
}

export const Input = (props) => {
  const { type, title, onChange, errorMessage, value, isValid, checked, readonly } = props;
  const inputType = type || 'text';
  const htmlFor = `${inputType}-${Math.random()}`;
  return (
    <div
      className={`${isInvalid(props) ? classes.invalid : ''} ${type === 'checkbox' ? classes.Checkbox : classes.Input}`}
    >
      <label htmlFor={htmlFor}>{title}</label>

      {inputType !== 'textarea ' ? (
        <input checked={checked} value={value} type={inputType} id={title} onChange={onChange} readOnly={readonly} />
      ) : (
        <textarea value={value} type={inputType} id={title} onChange={onChange} />
      )}
      {isInvalid(props) || !isValid ? <span>{errorMessage || 'Requried'}</span> : null}
    </div>
  );
};
Input.propTypes = {
  readonly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  type: PropTypes.string,
  errorMessage: PropTypes.string,
  value: PropTypes.string,
  isValid: PropTypes.bool,
  checked: PropTypes.bool,
};
Input.defaultProps = {
  title: 'title',
  type: 'text',
  errorMessage: null,
  value: null,
  isValid: false,
  checked: null,
  readonly: false
};
