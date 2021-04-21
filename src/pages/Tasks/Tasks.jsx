import { Component } from 'react';
import { Button } from '../../components/UI/Buttons/Button/Button';
import { getRefFirebase } from '../../firebase/helpers';
import { TasksModal } from '../../components/Modal/TasksModal/TasksModal';
import { TASKS } from '../../db/tableName';
import classes from './TableStyle.module.css';

const fakeData = [
  {
    DeadLine: '04/20/2021',
    Description: 'Do smth',
    StartDate: '04/04/2021',
    State: true,
    TaskId: 1,
    TaskName: 'Fix bugs',
    UserId: 'rusak.alexander2017@yandex.ru',
  },
  {
    DeadLine: '04/15/2021',
    Description: 'Set new values',
    StartDate: '04/04/2021',
    State: true,
    TaskId: 2,
    TaskName: 'Update your DB',
    UserId: 'rusak.alexander2017@yande.ru',
  },
  {
    DeadLine: '04/10/2021',
    Description: 'Do smt else',
    StartDate: '04/09/2021',
    State: false,
    TaskId: 2,
    TaskName: 'Do smt',
    UserId: 'rusak.alexander2017@yandex.ru',
  },
];

export class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isOpen: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  openModalHandler = () => {
    this.setState({ isOpen: true });
  };

  getData = () => {
    console.log('inner');
    getRefFirebase(TASKS).onSnapshot((doc) => {
      const tasks = doc.data() || [];
      this.setState({
        data: tasks,
      });
    });
  };

  getHeader = () => {
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
            <p>Start Date</p>
          </li>
          <li>
            <p>Deadline</p>
          </li>
          <li>
            <p>Action</p>
          </li>
        </ul>
      </div>
    );
  };

  getTable = (data, index) => {
    return (
      <div className={classes.TableStyle}>
        <ul className={classes.table}>
          <li>
            <p>{index + 1}</p>
          </li>
          <li>
            <p>{data.TaskName}</p>
          </li>
          <li>
            <p>{data.Description}</p>
          </li>
          <li>
            <p>{data.StartDate}</p>
          </li>
          <li>
            <p>{data.DeadLine}</p>
          </li>
          <li className={classes.actions}>
            <Button className={classes.warning}>
              <p>Edit</p>
            </Button>
            <Button className={classes.delete}>
              <p>Delete</p>
            </Button>
          </li>
        </ul>
      </div>
    );
  };

  render() {
    const { data, isOpen } = this.state;
    console.log(data);
    return (
      <>
        <Button onClick={this.openModalHandler} className={`${classes.default} ${classes.pushRight}`}>
          <p>Create</p>
        </Button>
        {this.getHeader()}
        {fakeData.map((item, index) => this.getTable(item, index))}
        {isOpen && <TasksModal />}
      </>
    );
  }
}
