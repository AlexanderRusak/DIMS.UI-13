import PropTypes from 'prop-types';
import classes from './Input.module.css';

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched;
}

export const Input = (props) => {
  const { type, title, onChange, errorMessage, value, isError } = props;
  const inputType = type || 'text';
  const htmlFor = `${inputType}-${Math.random()}`;
  return (
    <div className={`${classes.Input} ${isInvalid(props) ? classes.invalid : ''}`}>
      <label htmlFor={htmlFor}>{title}</label>
      {inputType !== 'textarea' ? (
        <input value={value} type={inputType} id={htmlFor} onChange={onChange} />
      ) : (
        <textarea value={value} type={inputType} id={htmlFor} onChange={onChange} />
      )}
      {isInvalid(props) || !isError ? <span>{errorMessage || 'Requried'}</span> : null}
    </div>
  );
};
Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  type: PropTypes.string,
  errorMessage: PropTypes.string,
  value: PropTypes.shape(),
  isError: PropTypes.bool,
};
Input.defaultProps = {
  title: 'title',
  type: 'text',
  errorMessage: null,
  value: null,
  isError: null,
};
