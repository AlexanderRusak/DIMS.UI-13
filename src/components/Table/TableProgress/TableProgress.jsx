import PropTypes from 'prop-types';
import classes from '../Table.module.css';

export const TableProgress = (props) => {
  const { data } = props;
  const { UserID, UserName, TaskName, TrackNote, TrackDate } = data;

  return (
    <>
      <div className={classes.Table}>
        <ul>
          <li>
            <p>{UserID}</p>
          </li>
          <li>
            <p>{UserName}</p>
          </li>
          <li>
            <p>{TaskName}</p>
          </li>
          <li>
            <p>{TrackNote}</p>
          </li>
          <li>
            <p>{TrackDate}</p>
          </li>
        </ul>
      </div>
    </>
  );
};

TableProgress.propTypes = {
  data: PropTypes.instanceOf(Object),
};
TableProgress.defaultProps = {
  data: PropTypes.instanceOf(Object),
};
