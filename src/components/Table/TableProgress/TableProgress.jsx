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
  data: PropTypes.shape({
    UserID: PropTypes.number.isRequired,
    UserName: PropTypes.string.isRequired,
    TaskName: PropTypes.string.isRequired,
    TrackNote: PropTypes.string.isRequired,
    TrackDate: PropTypes.string.isRequired,
  }).isRequired,
};
