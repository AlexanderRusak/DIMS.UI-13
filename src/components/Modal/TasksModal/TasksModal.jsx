import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../UI/Buttons/Button/Button';
import { Checkbox } from '../../UI/CheckBox/Checkbox';
import { Input } from '../../UI/Input/Input';
<<<<<<< HEAD
import { toLowerCaseFirstLetter, toTrim } from '../modalHelpers/helpers';
=======
import { fakeUsers } from '../../../fakeUsers';
>>>>>>> fe3e434b47a74e74a744198bc3bfc3bfd04dc4fe
import classes from './TasksModal.module.css';
import { Label } from '../../UI/Label/Label';
import {
  setMinLengthRequired,
  isCheckBoxValueRequired,
  isValidForm,
  errorTitle,
} from '../../Validation/validationHelpers';

export class TasksModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      users: [...props.users],
      userList: props.users.map((user) => {
        return { name: user.name, isCheck: false };
      }),
      taskName: '',
      description: '',
      startDate: '',
      deadLine: '',
      touched: {
        taskName: false,
        description: false,
        startDate: false,
        deadLine: false,
        checkbox: false,
      },
      isValid: {
        taskName: false,
        description: false,
        startDate: false,
        deadLine: false,
        checkbox: false,
      },
    };
  }

<<<<<<< HEAD
  componentDidMount() {
    const { index, type, users } = this.props;
    const data = this.props;
    console.log(index, type, data.data);

    this.setState({
      taskName: type === 'create' ? '' : data.data[index].taskName,
      description: type === 'create' ? '' : data.data[index].description,
      startDate: type === 'create' ? '' : data.data[index].startDate,
      deadLine: type === 'create' ? '' : data.data[index].deadLine,
      isValid: {
        taskName: type === 'edit' ? !!data.data[index].taskName : false,
        description: type === 'edit' ? !!data.data[index].description : false,
        startDate: type === 'edit' ? !!data.data[index].startDate : false,
        deadLine: type === 'edit' ? !!data.data[index].deadLine : false,
        checkbox: type === 'edit' ? !!users : false,
      },
=======
  getCheckedUser = (index) => {
    /* mokk */
    const newUsers = [...fakeUsers];
    newUsers[index].isCheck = !newUsers[index].isCheck;
    this.setState({
      fakeUsers,
>>>>>>> fe3e434b47a74e74a744198bc3bfc3bfd04dc4fe
    });
  }

  setTouched = (elementName) => {
    const { touched } = this.state;
    const newTouched = { ...touched, [elementName]: true };
    this.setState({ touched: newTouched });
  };

  getCreateModal = (fakeUsers, test, onClose, onSubmit) => (
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

  getDetailsModal = (fakeUsers, onClose, onSubmit) => (
    <div className={classes.container}>
      <Label title='Name' />
      <Label title='Description' />
      <Label title='Start Date' />
      <Label title='Deadline' />
      {fakeUsers
        .filter((user) => user.isCheck)
        .map((user) => (
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

  render() {
    const { type, index } = this.props;

    return <div className={classes.TasksModal}>{this.getModal(index, type)}</div>;
  }
}

TasksModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  index: PropTypes.number,
  users: PropTypes.shape([
    {
      name: PropTypes.string.isRequired,
      isCheck: PropTypes.bool.isRequired,
    },
  ]),
  data: PropTypes.shape([
    {
      deadLine: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      state: PropTypes.bool.isRequired,
      taskId: PropTypes.number.isRequired,
      taskName: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
    },
  ]),
};
TasksModal.defaultProps = {
  index: null,
  users: [],
  data: [],
};
