import PropTypes from 'prop-types';
import { Button } from '../../UI/Buttons/Button/Button';
import classes from './DeleteModal.module.css';

export const DeleteModal = ({ title, onClose, item, onDelete }) => {

  const getDeleteModalTemplate = (title, onClose, item, onDelete) =>
  (
    <>
      <h1>Delete {title}</h1>
      <p>Are you sure you want to delete the current {title} ?</p>
      <div className={classes.buttonGroup}>
        <Button onClick={() => onDelete(item)}>
          <i>Delete</i>
        </Button>
        <Button onClick={onClose}>
          <i>Back To List</i>
        </Button>
      </div>
    </>
  )


  return (
    <div className={classes.DeleteModal}>
      {getDeleteModalTemplate(title, onClose, item, onDelete)}
    </div >
  );
};

DeleteModal.propTypes = {
  item: PropTypes.number.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

DeleteModal.defaultProps = {
  title: 'item',
};
