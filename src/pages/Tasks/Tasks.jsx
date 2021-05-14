import { Component } from 'react';

import { ButtonGroup } from '../../components/ButtonGroup/ButtonGroup';
import { getRefFirebase } from '../../firebase/helpers';
import { TasksModal } from '../../components/Modal/TasksModal/TasksModal';
import { TASKS } from '../../db/tableName';
import { defaultProps } from '../../defaultValues/default';
import classes from './TableStyle.module.css';
import noop from '../../shared/noop';

const fakeData = [
  {
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
  },
];

export class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isOpen: false,
      modalType: '',
    };
  }

  componentDidMount() {
    this.getData();
  }

  openModalHandler = (type) => {
    this.setState({ isOpen: true, modalType: type });
  };

  onClose = () => {
    this.setState({ isOpen: false });
  };

  getLink = (data) => (
    <i
      tabIndex={defaultProps.tabIndex}
      aria-label={defaultProps.ariaLabel}
      type={defaultProps.type}
      role='button'
      onClick={this.openModalHandler}
      onKeyPress={noop}
    >
      {data.taskName}
    </i>
  );

  onSubmitData = () => {
    /*  to db */
    this.onClose();
  };

  getData = () => {
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
          <li>{this.getLink(data)}</li>
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
            {
              <ButtonGroup
                modalType='edit'
                title='Edit'
                styles={`${classes.warning}`}
                onClick={this.openModalHandler}
              />
            }
            {
              <ButtonGroup
                modalType='delete'
                title='Delete'
                styles={`${classes.delete}`}
                onClick={this.openModalHandler}
              />
            }
          </li>
        </ul>
      </div>
    );
  };

  render() {
    const { data, isOpen, modalType } = this.state;
    console.log(data); // i need it later

    return (
      <>
        {
          <ButtonGroup
            modalType='create'
            title='Create'
            styles={`${classes.default} ${classes.pushRight}`}
            onClick={this.openModalHandler}
          />
        }
        {this.getHeader()}
        {fakeData.map((item, index) => (
          <div key={item.taskName}>{this.getTable(item, index)}</div>
        ))}
        {isOpen && <TasksModal type={modalType} onClose={this.onClose} onSubmit={this.onSubmitData} />}
      </>
    );
  }
}
