import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '../../components/UI/Buttons/Button/Button';
import { TASKS } from '../../db/tableName';
import { ButtonGroup } from '../../components/ButtonGroup/ButtonGroup';
import classes from '../TableStyle.module.css';
import firebase from '../../firebase/firebase';

class MemebersTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      role: 'mentor',
      index: '',
      /*       status: '' */
    };
  }

  componentDidMount() {
    this.getData();
  }

  

  updateStatus = (i) => {
    const { data, index } = this.state;
    const newData = [...data];
    newData[i].State = !newData[i].State;
    data[i] = newData[i];
    this.setState({ index: i, data });
    console.log(data[i], index);
  };

  getTable = ({ TaskName: taskName, Description: description, DeadLine: deadLine, State: state }, index) => {
    const { role } = this.state;

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
          <li className={classes.state}>
            <p>{!state ? 'In prgress' : 'Done'}</p>
          </li>
          <li className={classes.actions}>
            {role === 'mentor' ? (
              <>
                <ButtonGroup
                  title='Active'
                  styles={`${classes.button} ${classes.default}`}
                  onClick={() => this.updateStatus(index)}
                />
                <ButtonGroup title='Fail' styles={`${classes.button} ${classes.danger}`} />
              </>
            ) : (
              <Link
                to={{
                  pathname: '/members-tracks',
                }}
              >
                <Button className={classes.default}>
                  <p>Create</p>
                </Button>
              </Link>
            )}
          </li>
        </ul>
      </div>
    );
  };

  getTableHeader = () => {
    const { role } = this.state;

    return (
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
            <p>{role === 'mentor' ? 'Update status' : 'Track'}</p>
          </li>
        </ul>
      </div>
    );
  };

  getData = () => {
    const ref = firebase.firestore().collection('data').doc(TASKS);
    ref.onSnapshot((doc) => {
      const { tasksMembers } = doc.data();
      console.log(tasksMembers);
      this.setState({
        data: tasksMembers,
      });
    });
  };

  render() {
    const { data } = this.state;
    console.log(data);
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
