import { Component } from 'react';
import { RoleContext } from '../../hoc/RoleContext/RoleContext';
import { deleteData, getData, setData } from '../../firebase/firebase';
import { getUsers, getMaxValue } from './helpers';
import { ButtonGroup } from '../../components/ButtonGroup/ButtonGroup';
import { Table } from '../../hoc/Table/Table';
import { TableHeader } from '../../components/Table/TableHeader';
import { TableBody } from '../../components/Table/TableBody';
import { TasksModal } from '../../components/Modal/TasksModal/TasksModal';
import { DeleteModal } from '../../components/Modal/DeleteModal/DeleteModal';
import { defaultProps } from '../../defaultValues/default';
import { TASKS } from '../../db/tableName';
import classes from './TableStyle.module.css';
import noop from '../../shared/noop';

export class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      modalType: '',
      index: null,
      isModalOpen: false,
      users: [],
      currentTasksData: [],
    };
  }

  async componentDidMount() {
    const currentTasksData = await getData(TASKS);

    const { data } = this.context;
    this.setState({
      currentTasksData,

      users: getUsers(data),
    });
  }

  openModalHandler = (index, type) => () => {
    this.setState({ isOpen: type !== 'delete', modalType: type, index });
    if (type === 'delete') {
      this.onDeleteModalOpen(index);
    }
  };

  onSubmitData = async (data, users, index, type) => {
    const { currentTasksData } = this.state;
    const nextIndex = getMaxValue({ ...currentTasksData });

    if (type === 'create') {
      currentTasksData.push({ ...data, taskId: nextIndex, users });
      await setData(TASKS, { ...data, taskId: nextIndex, users }, nextIndex);
      this.setState({
        currentTasksData,
      });
    } else {
      currentTasksData[index] = { ...data, users };
      this.setState({
        currentTasksData,
      });
      await setData(TASKS, { ...data, users }, index + 1);
    }
    this.onClose();
  };

  onClose = () => {
    this.setState({ isOpen: false, isModalOpen: false });
  };

  onDeleteModalOpen = (index) => {
    this.setState({ isModalOpen: true, index });
  };

  onDelete = (index) => () => {
    const { currentTasksData } = this.state;
    const selectedCurrentId = currentTasksData[index].taskId;

    deleteData(TASKS, selectedCurrentId);
    currentTasksData.splice(index, 1);

    this.setState({ currentTasksData: [...currentTasksData], isModalOpen: false });
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
    ];
  };

  render() {
    const { isOpen, modalType, index, isModalOpen, currentTasksData, users } = this.state;

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
            items={currentTasksData}
            buttons={this.getButtons()}
            detailsHeader='Task Name'
            detailsComponent={this.getLink}
          />
        </Table>
        {isOpen && (
          <TasksModal
            users={users}
            data={currentTasksData}
            index={index}
            type={modalType}
            onClose={this.onClose}
            onSubmit={this.onSubmitData}
          />
        )}
        {isModalOpen && <DeleteModal onClose={this.onClose} onDelete={this.onDelete(index)} />}
      </>
    );
  }
}

Tasks.contextType = RoleContext;
