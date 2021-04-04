import PropTypes from 'prop-types';
import classes from '../Table.module.css';

export const TableTasks = (props) => {
  const { data } = props;
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
  data: PropTypes.instanceOf(Object),
};
TableTasks.defaultProps = {
  data: PropTypes.instanceOf(Object),
};
