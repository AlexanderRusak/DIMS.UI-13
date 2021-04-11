import PropTypes from 'prop-types';
import Backdrop from '../UI/Backdrop/Backdrop';
import { SaveButton } from '../UI/Buttons/SaveButton/SaveButton';
import { Button } from '../UI/Buttons/Button/Button';
import classes from './ModalEdit.module.css';

export const ModalEdit = ({ isOpen, onClose }) => {
  return (
    <>
      <div className={`${classes.ModalEdit} ${isOpen ? classes.open : classes.close}`}>
        <h1>Header</h1>
        <span>Name</span>
        <input type='text' />
        <span>Name</span>
        <input type='text' />
        <span>Name</span>
        <input type='text' />
        <div>
          <SaveButton>
            <p>Save</p>
          </SaveButton>
          <Button onClick={onClose}>
            <p>Back to grid</p>
          </Button>
        </div>
      </div>
      {isOpen ? <Backdrop onPress={null} onClick={onClose} /> : null}
    </>
  );
};

ModalEdit.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
