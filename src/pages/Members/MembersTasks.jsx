import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '../../components/UI/Buttons/Button/Button';
import { TASKS } from '../../db/tableName';
import classes from './TableStyle.module.css';
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

  getTable = ({ taskName, description, deadLine, state }, index) => {
    return (
      <div className={classes.TableStyle}>
        <ul className={classes.table}>
          <li>
            <p>{index + 1}</p>
          </li>
          <li>
            <p>{taskName}</p>
          </li>
          <li>
            <p>{description}</p>
          </li>
          <li>
            <p>{deadLine}</p>
          </li>
          <li>
            <p>{state ? 'In prgress' : 'Done'}</p>
          </li>
          <li className={classes.actions}>
            <Link
              to={{
                pathname: '/members-tracks',
              }}
            >
              <Button className={classes.default}>
                <p>Create</p>
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  getTableHeader = () => (
    <div className={classes.TableStyle}>
      <ul className={classes.header}>
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
        <li>
          <p>Track</p>
        </li>
      </ul>
    </div>
  );

  getData = () => {
    const ref = firebase.firestore().collection('data').doc(TASKS);
    ref.onSnapshot((doc) => {
      const { tasksMembers } = doc.data();
      this.setState({
        data: tasksMembers,
      });
    });
  };

  render() {
    const { data } = this.state;
    const { location } = this.props;
    const newData = data.filter((arr) => {
      return arr.UserId === location.emailId;
    });
    return (
      <>
        {this.getTableHeader()}
        {newData.map((row, index) => this.getTable(row, index))}
      </>
    );
  }
}

MemebersTasks.propTypes = {
  location: PropTypes.shape({ emailId: PropTypes.string }).isRequired,
};
MemebersTasks.defaultProps = {};

export default MemebersTasks;
