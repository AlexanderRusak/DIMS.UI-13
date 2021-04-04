import PropTypes from 'prop-types';
import { Button } from '../../UI/Buttons/Button/Button';
import classes from '../Table.module.css';

export const Table = (props) => {
  const { data } = props;
  const { UserId, FullName, Direction, Education, Age } = data;
  const cls = [classes.button, classes.delete];

  return (
    <>
      <div className={classes.Table}>
        <ul>
          <li>
            <p>{UserId}</p>
          </li>
          <li>
            <p>{FullName}</p>
          </li>
          <li>
            <p>{Direction}</p>
          </li>
          <li>
            <p>{Education}</p>
          </li>
          <li className={classes.age}>
            <p>{Age}</p>
          </li>
          <li className={classes.actions}>
            <Button className={classes.button}>
              <p className={classes.fontButton}>Progress</p>
            </Button>
            <Button className={classes.button}>
              <p className={classes.fontButton}>Tasks</p>
            </Button>
            <Button className={classes.button}>
              <p className={classes.fontButton}>Edit</p>
            </Button>
            <Button className={cls.join(' ')}>
              <p className={classes.fontButton}>Delete</p>
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
};

Table.propTypes = {
  data: PropTypes.instanceOf(Object),
};
Table.defaultProps = {
  data: PropTypes.instanceOf(Object),
};
