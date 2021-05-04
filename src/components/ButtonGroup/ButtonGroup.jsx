import PropTypes from 'prop-types';
import { Button } from '../UI/Buttons/Button/Button';

export const ButtonGroup = ({ modalType, title, styles, onClick, index }) => (
  <Button onClick={() => onClick(modalType, index)} className={styles}>
    {' '}
    <p>{title}</p>
  </Button>
);

ButtonGroup.propTypes = {
  modalType: PropTypes.string,
  title: PropTypes.string,
  styles: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number,
};

ButtonGroup.defaultProps = {
  modalType: null,
  title: 'Button',
  styles: null,
  index: null,
};
