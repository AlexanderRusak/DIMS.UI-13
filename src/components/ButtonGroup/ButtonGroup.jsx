import PropTypes from 'prop-types';
import { Button } from '../UI/Buttons/Button/Button';

export const ButtonGroup = ({ modalType, title, styles, onClick, disabled }) => {
  return (
    <Button disabled={disabled} onClick={() => onClick(modalType)} className={styles}>
      <p>{title}</p>
    </Button>
  )
}

ButtonGroup.propTypes = {
  modalType: PropTypes.string,
  title: PropTypes.string,
  styles: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

ButtonGroup.defaultProps = {
  modalType: null,
  title: 'Button',
  styles: null,
  disabled: false
};
