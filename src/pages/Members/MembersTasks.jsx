import { Component } from 'react';
import { TableTasks } from '../../components/Table/TableTasks/TableTasks';
import { getDataFromLS, setDataToLS } from '../../localStorage/localStorageFunctions';
import { TASKS } from '../../db/tableName';
import classes from '../Members.module.css';
import firebase from '../../firebase';

class MemebersTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getTableHeader = () => (
    <div className={classes.Members}>
      <ul>
        <li>
          <p>#</p>
        </li>
        <li>
          <p>Task Name</p>
        </li>
        <li>
          <p>Description</p>
        </li>
        <li>
          <p>DeadLine</p>
        </li>
        <li>
          <p>State</p>
        </li>
      </ul>
    </div>
  );

  getData = () => {
    if (getDataFromLS(TASKS)) {
      this.setState({
        data: getDataFromLS(TASKS),
      });
    } else {
      const ref = firebase.firestore().collection('data').doc(TASKS);
      ref.onSnapshot((doc) => {
        const { tasksMembers } = doc.data();
        setDataToLS(TASKS, tasksMembers);
        this.setState({
          data: tasksMembers,
        });
      });
    }
  };

  render() {
    const { data } = this.state;

    return (
      <>
        {this.getTableHeader()}
        {data.map((row) => (
          <TableTasks key={row.UserId} data={row} />
        ))}
      </>
    );
  }
}

MemebersTasks.propTypes = {};
MemebersTasks.defaultProps = {};

export default MemebersTasks;
