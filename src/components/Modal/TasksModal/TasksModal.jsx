import { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../UI/Buttons/Button/Button';
import { Checkbox } from '../../UI/CheckBox/Checkbox';
import { Input } from '../../UI/Input/Input';
import classes from './TasksModal.module.css';
import { Label } from '../../UI/Label/Label';

export class TasksModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'rerre',
      users: [...props.users],
      userList: props.users.map((user) => { return { name: user.name, isCheck: false } }),
      TaskName: props.type === 'create' ? '' : props.data[props.index].TaskName,
      Description: props.type === 'create' ? '' : props.data[props.index].Description,
      StartDate: props.type === 'create' ? '' : props.data[props.index].StartDate,
      DeadLine: props.type === 'create' ? '' : props.data[props.index].DeadLine,
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
    const { TaskName, DeadLine, Description, StartDate, userList, } = this.state;
    const users = [...userList];

    return (
      <div className={classes.container}>
        <Input value={TaskName} title='Name' isError={!!test} onChange={(e) => this.getInputValue('TaskName', e.target.value)} />
        <Input value={Description} title='Description' isError={!!test} onChange={(e) => this.getInputValue('Description', e.target.value)} />
        <Input value={StartDate} title='Start Date' isError={!!test} type='date' onChange={(e) => this.getInputValue('StartDate', e.target.value)} />
        <Input value={DeadLine} title='Deadline' isError={!!test} type='date' onChange={(e) => this.getInputValue('DeadLine', e.target.value)} />
        <Checkbox checkHandler={this.getCreateCheckedUser} users={userList} />
        <div className={classes.btnGroup}>
          <Button typeButton='primary' onClick={() => this.onSubmitHandler({ TaskName, DeadLine, Description, StartDate }, users, index, type)}>
            Create
          </Button>
          <Button typeButton='default' onClick={this.onCloseHandler}>
            Back To List
          </Button>
        </div>
      </div>
    );
  };

  getEditModal = (test, index, type) => {
    const { TaskName, DeadLine, Description, StartDate, users } = this.state;


    return (
      <div className={classes.container}>
        <Input onChange={(e) => this.getInputValue('TaskName', e.target.value)} title='TaskName' isError={!!test} value={TaskName} />
        <Input title='Description' isError={!!test} onChange={(e) => this.getInputValue('Description', e.target.value)} value={Description} />
        <Input title='Start Date' isError={!!test} type='date' onChange={(e) => this.getInputValue('StartDate', e.target.value)} value='2021-07-22' />
        <Input title='Deadline' isError={!!test} type='date' onChange={(e) => this.getInputValue('DeadLine', e.target.value)} value={DeadLine} />
        <Checkbox checkHandler={this.getCheckedUser} users={users} />
        <div className={classes.btnGroup}>
          <Button typeButton='primary' onClick={() => this.onSubmitHandler({ TaskName, DeadLine, Description, StartDate }, users, index, type)}>
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
    const { TaskName, Description, DeadLine, StartDate } = this.state;
    const { users } = this.props;

    const newUsers = users.filter((user) => user.isCheck);
    return (
      <div className={classes.container}>
        <Label value={TaskName} title='Name' />
        <Label value={Description} title='Description' />
        <Label value={DeadLine} title='Start Date' />
        <Label value={StartDate} title='Deadline' />
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
    );
  };

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
