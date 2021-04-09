import classes from './Tasks.module.css';

export const Tasks = () => {
  return (
    <>
      <div className={classes.Tasks}>
        <ul>
          <li>
            <p>#</p>
          </li>
          <li>
            <p>Task</p>
          </li>
          <li>
            <p>Note</p>
          </li>
          <li>
            <p>Date</p>
          </li>
        </ul>
      </div>
      <div className={classes.Tasks}>
        <ul>
          <li>
            <p>#</p>
          </li>
          <li>
            <p>Task</p>
          </li>
          <li>
            <p>Note</p>
          </li>
          <li>
            <p>Date</p>
          </li>
        </ul>
      </div>
    </>
  );
};
