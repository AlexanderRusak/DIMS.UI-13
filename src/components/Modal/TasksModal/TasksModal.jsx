import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../UI/Buttons/Button/Button';
import { Checkbox } from '../../UI/CheckBox/Checkbox';
import { Input } from '../../UI/Input/Input';
import { fakeUsers } from '../../../fakeUsers'
import classes from './TasksModal.module.css';
import { Label } from '../../UI/Label/Label';

export class TasksModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      test: 'rerre',
      fakeUsers: [],
    };
  }

  getCheckedUser = (index) => { /* mokk */
    const newUsers = [...fakeUsers];
    newUsers[index].isCheck = !newUsers[index].isCheck;
    this.setState({
      fakeUsers
    });
  };

  getCreateModal = (fakeUsers, test, onClose, onSubmit) =>
  (
    <div className={classes.container}>
      <Input title='Name' isValid={!!test} />
      <Input title='Description' isValid={!!test} />
      <Input title='Start Date' isValid={!!test} type='date' />
      <Input title='Deadline' isValid={!!test} type='date' />
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

  getDetailsModal = (fakeUsers, onClose, onSubmit) =>
  (
    <div className={classes.container}>
      <Label title='Name' />
      <Label title='Description' />
      <Label title='Start Date' />
      <Label title='Deadline' />
      {fakeUsers.filter((user) => user.isCheck).map((user) => (
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
  )

  render() {
    const { fakeUsers, test } = this.state;
    const { onClose, onSubmit, type } = this.props;

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
