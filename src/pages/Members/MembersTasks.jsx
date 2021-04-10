import { Component } from 'react';
import PropTypes from 'prop-types';
import { TableTasks } from '../../components/Table/TableTasks/TableTasks';
import { getDataFromLS, setDataToLS } from '../../localStorage/localStorageFunctions';
import { TASKS } from '../../db/tableName';
import classes from '../Headers.module.css';
import firebase from '../../firebase/firebase';

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
    <div className={classes.Headers}>
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
      this.setState(() => {
        return {
          data: getDataFromLS(TASKS),
        };
      });
    } else {
      const ref = firebase.firestore().collection('data').doc(TASKS);
      ref.onSnapshot((doc) => {
        const { tasksMembers } = doc.data();
        setDataToLS(TASKS, tasksMembers);
        this.setState(() => {
          return {
            data: tasksMembers,
          };
        });
      });
    }
  };

  render() {
    const { data } = this.state;
    const { location } = this.props;
    console.log(location.id);
    const newData = data.filter((arr) => {
      return arr.UserId === location.id;
    });
    console.log(newData);

    return (
      <>
        {this.getTableHeader()}
        {newData.map((row) => (
          <TableTasks data={row} />
        ))}
      </>
    );
  }
}

MemebersTasks.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};
MemebersTasks.defaultProps = {};

export default MemebersTasks;