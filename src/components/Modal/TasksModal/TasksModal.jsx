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
      fakeUsers: [
        { name: 'John Travolta', isCheck: true },
        { name: 'Harry Shproptter', isCheck: false },
        { name: 'Vasya Katapulta', isCheck: false },
        { name: 'John Travolta', isCheck: true },
        { name: 'Harry Shproptter', isCheck: false },
        { name: 'Vasya Katapulta', isCheck: false },
      ],
    };
  }

  getCheckedUser = (index) => {
    const { fakeUsers } = this.state;
    const newUsers = [...fakeUsers];
    newUsers[index].isCheck = !newUsers[index].isCheck;
    this.setState({
      fakeUsers: [...newUsers],
    });
    console.log(fakeUsers);
  };

  getCreateModal = (fakeUsers, test, onClose, onSubmit) => {
    return (
      <div className={classes.container}>
        <Input title='Name' isError={!!test} />
        <Input title='Description' isError={!!test} />
        <Input title='Start Date' isError={!!test} type='date' />
        <Input title='Deadline' isError={!!test} type='date' />
        <Checkbox checkHandler={this.getCheckedUser} users={fakeUsers} />
        <div className={classes.btnGroup}>
          <Button typeButton='primary' onClick={onSubmit}>
            Create
          </Button>
          <Button typeButton='default' onClick={onClose}>
            Back To List
          </Button>
        </div>
      </div>
    );
  };

  getDetailsModal = (fakeUsers, test, onClose, onSubmit) => {
    const checkedUsers = fakeUsers.filter((user) => user.isCheck);
    return (
      <div className={classes.container}>
        <Label value='dssdsds' title='Name' />
        <Label value='dssdsds' title='Description' />
        <Label value='dssdsds' title='Start Date' />
        <Label value='dssdsds' title='Deadline' />
        {checkedUsers.map((user) => (
          <Label key={user.name} value={user.name} />
        ))}
        <div className={classes.btnGroup}>
          <Button typeButton='primary' onClick={onSubmit}>
            Create
          </Button>
          <Button typeButton='default' onClick={onClose}>
            Back To List
          </Button>
        </div>
      </div>
    );
  };

  render() {
    const { fakeUsers, test } = this.state;
    const { onClose, onSubmit, type } = this.props;
    console.log(type);

    return (
      <div className={classes.TasksModal}>
        {type === 'create' && this.getCreateModal(fakeUsers, test, onClose, onSubmit)}
        {type === 'details' && this.getDetailsModal(fakeUsers, test, onClose, onSubmit)}
      </div>
    );
  }
}

TasksModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
TasksModal.defaultProps = {};
