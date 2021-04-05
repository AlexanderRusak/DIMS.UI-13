import PropTypes from 'prop-types';
import Backdrop from '../UI/Backdrop/Backdrop';
import { SaveButton } from '../UI/Buttons/SaveButton/SaveButton';
import { Button } from '../UI/Buttons/Button/Button';
import classes from './ModalCreateUpdate.module.css';

export const ModalCreateUpdate = ({ isOpen, onClose }) => {
  const cls = [classes.ModalCreateUpdate];
  console.log(isOpen);
  if (isOpen) {
    cls.push(classes.open);
  } else {
    cls.push(classes.close);
  }

  return (
    <>
      <div className={cls.join(' ')}>
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

ModalCreateUpdate.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
