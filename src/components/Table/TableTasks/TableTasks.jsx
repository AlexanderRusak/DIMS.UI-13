import PropTypes from 'prop-types';
import classes from '../Table.module.css';

export const TableTasks = ({ data }) => {
  const { UserId, TaskName, Description, DeadLine, State } = data;

  return (
    <>
      <div className={classes.Table}>
        <ul>
          <li>
            <p>{UserId}</p>
          </li>
          <li>
            <p>{TaskName}</p>
          </li>
          <li>
            <p>{Description}</p>
          </li>
          <li>
            <p>{DeadLine}</p>
          </li>
          <li>
            <p>{State ? 'In prgress' : 'Done'}</p>
          </li>
        </ul>
      </div>
    </>
  );
};

TableTasks.propTypes = {
  data: PropTypes.shape({
    UserId: PropTypes.number.isRequired,
    TaskName: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    DeadLine: PropTypes.string.isRequired,
    State: PropTypes.bool.isRequired,
  }).isRequired,
};
