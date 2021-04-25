import { Component } from 'react';
import { Button } from '../../components/UI/Buttons/Button/Button';
import { getRefFirebase } from '../../firebase/helpers';
import { TasksModal } from '../../components/Modal/TasksModal/TasksModal';
import { DeleteModal } from '../../components/Modal/DeleteModal/DeleteModal';
import { TASKS } from '../../db/tableName';
import classes from './TableStyle.module.css';

const fakeData = [
  {
<<<<<<< HEAD
    DeadLine: '2021-04-28',
    Description: 'Do smth',
    StartDate: '2021-04-25',
    State: true,
    TaskId: 1,
    TaskName: 'Fix bugs',
    UserId: 'rusak.alexander2017@yandex.ru',
  },
  {
    DeadLine: '2021-04-28',
    Description: 'Set new values',
    StartDate: '2021-04-22',
    State: true,
    TaskId: 2,
    TaskName: 'Update your DB',
    UserId: 'rusak.alexander2017@yande.ru',
  },
  {
    DeadLine: '2021-04-28',
    Description: 'Do smt else',
    StartDate: '2021-04-23',
    State: false,
    TaskId: 2,
    TaskName: 'Do smt',
    UserId: 'rusak.alexander2017@yandex.ru',
=======
    deadLine: '04/20/2021',
    description: 'Do smth',
    startDate: '04/04/2021',
    state: true,
    taskId: 1,
    taskName: 'Fix bugs',
    userId: 'rusak.alexander2017@yandex.ru',
  },
  {
    deadLine: '04/15/2021',
    description: 'Set new values',
    startDate: '04/04/2021',
    state: true,
    taskId: 2,
    taskName: 'Update your DB',
    userId: 'rusak.alexander2017@yande.ru',
  },
  {
    deadLine: '04/10/2021',
    description: 'Do smt else',
    startDate: '04/09/2021',
    state: false,
    taskId: 2,
    taskName: 'Do smt',
    userId: 'rusak.alexander2017@yandex.ru',
>>>>>>> 3a5586dc162b6a9a63c57dcc517ab265617d0c18
  },
];
const fakeUsers = [
  { name: 'John Travolt1a', isCheck: true },
  { name: 'Harry Shproptter', isCheck: false },
  { name: 'Vasya Kat2apulta', isCheck: false },
  { name: 'John Trav3olta', isCheck: true },
  { name: 'Harry Sh4proptter', isCheck: false },
  { name: 'Vasya K3tapulta', isCheck: false },
  { name: 'Harry Sh5proptter', isCheck: true },
  { name: 'Harry Sh3proptter', isCheck: true },
  { name: 'Haerry Sh3proptter', isCheck: true },
  { name: 'Ha4rry Shproptter', isCheck: false },
  { name: 'Ha4rry Shpr4optter', isCheck: true },
  { name: 'H4arry Shpr4optter', isCheck: true },
];


export class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isOpen: false,
      modalType: '',
      index: null,
      isModalOpen: false,
      users: [...fakeUsers],
      fdata: [...fakeData]
    };
  }

  componentDidMount() {
    this.getData();
  }

  openModalHandler = (type, data, index) => {
    this.setState({ isOpen: true, modalType: type, data, index });
  };

  onClose = () => {
    this.setState({ isOpen: false, isModalOpen: false });
  };

  onDeleteModalOpen = (index) => {
    this.setState({ isModalOpen: true, index })
  }

  onDelete = () => {
    const { index } = this.state;

    const newData = fakeData.splice(index, 1);
    this.setState({ data: [...newData], isModalOpen: false })
    console.log(newData, index);
  }

  onSubmitData = (currentData, users, index, type) => {
    const { data } = this.state;
    const newData = [...data];
    if (type === 'edit') newData[index] = currentData;
    if (type === 'create') newData.push(currentData)
    this.setState({ data: newData })
    console.log(newData);
    /* console.log(currentData, index); */
    this.onClose();
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
            <i
              aria-label='button'
              type='button'
              role='button'
              tabIndex='0'
              onClick={() => {
                this.openModalHandler('details', fakeData, index);
              }}
              onKeyPress={() => null}
            >
              {data.taskName}
            </i>
          </li>
          <li>
            <p>{data.description}</p>
          </li>
          <li>
            <p>{data.startDate}</p>
          </li>
          <li>
            <p>{data.deadLine}</p>
          </li>
          <li className={classes.actions}>
            <Button className={classes.warning} onClick={() => {
              this.openModalHandler('edit', fakeData, index);
            }}>
              <p>Edit</p>
            </Button>
            <Button className={classes.delete} onClick={() => this.onDeleteModalOpen(index)}>
              <p>Delete</p>
            </Button>
          </li>
        </ul>
      </div>
    );
  };

  render() {
    const { isOpen, modalType, index, isModalOpen, fdata, users } = this.state;



    return (
      <>
        <Button onClick={() => this.openModalHandler('create', fdata, index)} className={`${classes.default} ${classes.pushRight}`}>
          <p>Create</p>
        </Button>
        {this.getHeader()}
        {fakeData.map((item, index) => this.getTable(item, index))}
        {isOpen && <TasksModal users={users} data={fdata} index={index} type={modalType} onClose={this.onClose} onSubmit={this.onSubmitData} />}
        {isModalOpen && < DeleteModal onClose={this.onClose} onDelete={() => this.onDelete(index)} />}
      </>
    );
  }
}
