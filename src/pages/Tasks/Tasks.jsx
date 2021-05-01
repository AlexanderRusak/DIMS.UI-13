import { Component } from 'react';
import { ButtonGroup } from '../../components/ButtonGroup/ButtonGroup';
/* import { getRefFirebase } from '../../firebase/helpers'; */
import { TasksModal } from '../../components/Modal/TasksModal/TasksModal';
import { DeleteModal } from '../../components/Modal/DeleteModal/DeleteModal';
/* import { TASKS } from '../../db/tableName'; */
import { defaultProps } from '../../defaultValues/default';
import classes from './TableStyle.module.css';
import noop from '../../shared/noop';

const fakeData = [
  {
    deadLine: '2021-04-28',
    description: 'Do smth',
    startDate: '2021-04-25',
    state: true,
    taskId: 1,
    taskName: 'Fix bugs',
    userId: 'rusak.alexander2017@yandex.ru',
  },
  {
    deadLine: '2021-04-28',
    description: 'Set new values',
    startDate: '2021-04-22',
    state: true,
    taskId: 2,
    taskName: 'Update your DB',
    userId: 'rusak.alexander2017@yande.ru',
  },
  {
    deadLine: '2021-04-28',
    description: 'Do smt else',
    startDate: '2021-04-23',
    state: false,
    taskId: 2,
    taskName: 'Do smt',
    userId: 'rusak.alexander2017@yandex.ru',
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
      isOpen: false,
      modalType: '',
      index: null,
      isModalOpen: false,
      users: fakeUsers,
      fdata: fakeData
    };
  }


  /*   componentDidMount() {
      this.getData();
    } */

  openModalHandler = (type, index) => {
    this.setState({ isOpen: true, modalType: type, index });
  };

  onClose = () => {
    this.setState({ isOpen: false, isModalOpen: false });
  };


  getLink = (data, type, index) => (
    <i
      tabIndex={defaultProps.tabIndex}
      aria-label={defaultProps.ariaLabel}
      type={defaultProps.type}
      role='button'
      onClick={() => {
        this.openModalHandler(type, index);
      }}
      onKeyPress={noop}
    >
      {data.taskName}
    </i>
  );


  /*   getData = () => {
      getRefFirebase(TASKS).onSnapshot((doc) => {
        const tasks = doc.data() || [];
        this.setState({
          fdata: tasks,
        });
      });
    }; */

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
          <li>{this.getLink(data, 'details', index)}</li>
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
            {<ButtonGroup modalType='edit' title='Edit' styles={`${classes.warning}`} onClick={this.openModalHandler} />}
            {<ButtonGroup modalType='delete' title='Delete' styles={`${classes.delete}`} onClick={this.openModalHandler} />}
          </li>
        </ul>
      </div>
    );
  };

  render() {
    const { isOpen, modalType, index, isModalOpen, fdata, users } = this.state;

    console.log(index);
    return (
      <>
        {<ButtonGroup modalType='create' title='Create' styles={`${classes.default} ${classes.pushRight}`} onClick={this.openModalHandler} />}
        {this.getHeader()}
        {fdata.map((item, index) => this.getTable(item, index))}
        {isOpen && <TasksModal users={users} data={fdata} index={index} type={modalType} onClose={this.onClose} onSubmit={this.onSubmitData} />}
        {isModalOpen && < DeleteModal onClose={this.onClose} onDelete={() => this.onDelete(index)} />}
      </>
    );
  }
}