import { Component } from 'react';
import { ButtonGroup } from '../../components/ButtonGroup/ButtonGroup';
import { Table } from '../../hoc/Table/Table';
import { TableHeader } from '../../components/Table/TableHeader';
import { TableBody } from '../../components/Table/TableBody';
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
      fdata: fakeData,
    };
  }


  openModalHandler = (index, type) => () => {
    console.log(type, index);
    this.setState({ isOpen: type !== 'delete', modalType: type, index });
    if (type === 'delete') {
      this.onDeleteModalOpen(index);
    }
  };

  onClose = () => {
    this.setState({ isOpen: false, isModalOpen: false });
  };

  onDeleteModalOpen = (index) => {
    this.setState({ isModalOpen: true, index });
  };

  onDelete = () => {
    const { index, fdata } = this.state;
    fdata.splice(index, 1);
    console.log(fdata);
    this.setState({ fdata: [...fdata], isModalOpen: false });
  };

  getLink = (name, index) => (
    <i
      tabIndex={defaultProps.tabIndex}
      aria-label={defaultProps.ariaLabel}
      type={defaultProps.type}
      role='button'
      onClick={this.openModalHandler(index, 'details')}
      onKeyPress={noop}
    >
      {name}
    </i>
  );

  getButtons = () => {
    return [
      {
        component: ButtonGroup,
        styles: `${classes.button} ${classes.warning}`,
        title: 'Edit',
        type: 'edit',
        onClick: this.openModalHandler,
      },
      {
        component: ButtonGroup,
        styles: `${classes.button} ${classes.danger}`,
        title: 'Delete',
        type: 'delete',
        onClick: this.openModalHandler,
      },
    ]
  }


  render() {
    const { isOpen, modalType, index, isModalOpen, fdata, users } = this.state;

    return (
      <>

        <ButtonGroup
          index={index}
          type='create'
          title='Create'
          styles={`${classes.default} ${classes.pushRight}`}
          onClick={this.openModalHandler(null, 'create')}
        />
        <Table>
          <TableHeader items={['#', 'Task Name', 'Description', 'Start Date', 'Dead Line', 'Action']} />
          <TableBody
            header={['#', 'Task Name', 'Description', 'Start Date', 'DeadLine', 'Action']}
            items={fdata}
            buttons={this.getButtons()}
            detailsHeader='Task Name'
            detailsComponent={this.getLink}
          />
        </Table>
        {isOpen && (
          <TasksModal
            users={users}
            data={fdata}
            index={index}
            type={modalType}
            onClose={this.onClose}
            onSubmit={this.onSubmitData}
          />
        )}
        {isModalOpen && <DeleteModal onClose={this.onClose} onDelete={() => this.onDelete(index)} />}
      </>
    );
  }
}
