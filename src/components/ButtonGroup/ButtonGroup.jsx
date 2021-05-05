import PropTypes from 'prop-types';
import { Button } from '../UI/Buttons/Button/Button';

export const ButtonGroup = ({ modalType, title, styles, onClick }) => (
  <Button onClick={() => onClick(modalType)} className={styles}>
    <p>{title}</p>
  </Button>
);

ButtonGroup.propTypes = {
  modalType: PropTypes.string,
  title: PropTypes.string,
  styles: PropTypes.node,
  onClick: PropTypes.func.isRequired,
};

ButtonGroup.defaultProps = {
  modalType: null,
  title: 'Button',
  styles: null,
};
