import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../UI/Buttons/Button/Button';
import { Checkbox } from '../../UI/CheckBox/Checkbox';
import { Input } from '../../UI/Input/Input';
import classes from './TasksModal.module.css';
import { Label } from '../../UI/Label/Label';

export class TasksModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      test: 'rerre',
      users: [...props.users],
      userList: props.users.map((user) => { return { name: user.name, isCheck: false } }),
      taskName: props.type === 'create' ? '' : props.data[props.index].taskName,
      description: props.type === 'create' ? '' : props.data[props.index].description,
      startDate: props.type === 'create' ? '' : props.data[props.index].startDate,
      deadLine: props.type === 'create' ? '' : props.data[props.index].deadLine,
    };
  }

  getCheckedUser = (index) => {
    const { users } = this.state;
    const newUsers = [...users];
    newUsers[index].isCheck = !users[index].isCheck;
    this.setState({ users: newUsers })
  };

  getCreateCheckedUser = (index) => {
    const { userList } = this.state;
    const newUsers = [...userList];
    newUsers[index].isCheck = !userList[index].isCheck;
    this.setState({ userList: newUsers })
  };


  getInputValue = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  onSubmitHandler = (data, users, index, type) => {
    const { onSubmit } = this.props;
    console.log(data);
    onSubmit(data, users, index, type);
  }

  onCloseHandler = () => {
    const { onClose } = this.props;
    this.setState({ touched: false })
    onClose();
  }

  getCreateModal = (test, index, type) => {
    const { taskName, deadLine, description, startDate, userList} = this.state;
    const users = [...userList];

    return (
      <div className={classes.container}>
        <Input value={taskName} title='Name' isError={!!test} onChange={(e) => this.getInputValue('TaskName', e.target.value)} />
        <Input value={description} title='Description' isError={!!test} onChange={(e) => this.getInputValue('Description', e.target.value)} />
        <Input value={startDate} title='Start Date' isError={!!test} type='date' onChange={(e) => this.getInputValue('StartDate', e.target.value)} />
        <Input value={deadLine} title='Deadline' isError={!!test} type='date' onChange={(e) => this.getInputValue('DeadLine', e.target.value)} />
        <Checkbox checkHandler={this.getCreateCheckedUser} users={userList} />
        <div className={classes.btnGroup}>
          <Button typeButton='primary' onClick={() => this.onSubmitHandler({ taskName, deadLine, description, startDate }, users, index, type)}>
            Create
          </Button>
          <Button typeButton='default' onClick={this.onCloseHandler}>
            Back To List
          </Button>
        </div>
      </div>
    );
  }

  getEditModal = (test, index, type) => {
    const { taskName, deadLine, description, startDate, users } = this.state;


    return (
      <div className={classes.container}>
        <Input onChange={(e) => this.getInputValue('TaskName', e.target.value)} title='TaskName' isError={!!test} value={taskName} />
        <Input title='Description' isError={!!test} onChange={(e) => this.getInputValue('Description', e.target.value)} value={description} />
        <Input title='Start Date' isError={!!test} type='date' onChange={(e) => this.getInputValue('StartDate', e.target.value)} value='2021-07-22' />
        <Input title='Deadline' isError={!!test} type='date' onChange={(e) => this.getInputValue('DeadLine', e.target.value)} value={deadLine} />
        <Checkbox checkHandler={this.getCheckedUser} users={users} />
        <div className={classes.btnGroup}>
          <Button typeButton='primary' onClick={() => this.onSubmitHandler({ taskName, deadLine, description, startDate }, users, index, type)}>
            Create
          </Button>
          <Button typeButton='default' onClick={this.onCloseHandler}>
            Back To List
          </Button>
        </div>
      </div>
    );
  };

  getDetailsModal = () => {
    const { taskName, description, deadLine, startDate } = this.state;
    const { users } = this.props;

    const newUsers = users.filter((user) => user.isCheck);
    return (
      <div className={classes.container}>
        <Label value={taskName} title='Name' />
        <Label value={description} title='Description' />
        <Label value={deadLine} title='Start Date' />
        <Label value={startDate} title='Deadline' />
        <div className={classes.selectedUsers}>
          {newUsers.map((user) => (
            <Label key={user.name} value={user.name} />
          ))}
        </div>

        <div className={classes.btnGroup}>
          <Button typeButton='default' onClick={this.onCloseHandler}>
            Back To List
          </Button>
        </div>
      </div>
    )
  }

  render() {
    const { test, touched } = this.state;
    const { type, index } = this.props;
    console.log(touched);

    return (
      <div className={classes.TasksModal}>
        {type === 'create' && this.getCreateModal(test, index, type)}
        {type === 'details' && this.getDetailsModal()}
        {type === 'edit' && this.getEditModal(test, index, type)}
      </div>
    );
  }
}

TasksModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.shape(),
  index: PropTypes.number,
  users: PropTypes.shape().isRequired,
};
TasksModal.defaultProps = {
  index: null,
  data: null
};
