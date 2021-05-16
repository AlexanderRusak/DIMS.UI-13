import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../UI/Buttons/Button/Button';
import { Checkbox } from '../../UI/CheckBox/Checkbox';
import { Input } from '../../UI/Input/Input';
import { toLowerCaseFirstLetter, toTrim } from '../modalHelpers/helpers';
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

  componentDidMount() {
    const { index, type, users } = this.props;

    const data = this.props;


    this.setState({

      taskName: type !== 'create' ? data.data[index].taskName : '',
      description: type !== 'create' ? data.data[index].description : '',
      startDate: type !== 'create' ? data.data[index].startDate : '',
      deadLine: type !== 'create' ? data.data[index].deadLine : '',
      isValid: {
        taskName: type === 'edit' ? !!data.data[index].taskName : false,
        description: type === 'edit' ? !!data.data[index].description : false,
        startDate: type === 'edit' ? !!data.data[index].startDate : false,
        deadLine: type === 'edit' ? !!data.data[index].deadLine : false,
        checkbox: type === 'edit' ? !!users : false,
      },
    });
  }

  setTouched = (elementName) => {
    const { touched } = this.state;
    const newTouched = { ...touched, [elementName]: true };
    this.setState({ touched: newTouched });
  };

  setValid = (elementName, validFunc) => {
    const { isValid } = this.state;

    const newValid = { ...isValid, [elementName]: validFunc };
    this.setState({ isValid: newValid });
  };

  getInputValue = (event) => {
    const elementName = toLowerCaseFirstLetter(toTrim(event.target.attributes[1].nodeValue));
    this.setTouched(elementName);
    this.setValid(elementName, setMinLengthRequired(event.target.value, 5));
    this.setState({
      [elementName]: event.target.value,
    });
  };

  setCheckedUser = (index) => {
    const { users } = this.state;
    const newUsers = [...users];
    newUsers[index].isCheck = !users[index].isCheck;
    this.setValid('checkbox', isCheckBoxValueRequired(newUsers));
    this.setTouched('checkbox');
    this.setState({ users: newUsers });
  };

  setCreateCheckedUser = (index) => {
    const { userList } = this.state;
    const newUsers = [...userList];
    newUsers[index].isCheck = !userList[index].isCheck;
    this.setValid('checkbox', isCheckBoxValueRequired(newUsers));
    this.setTouched('checkbox');
    this.setState({ userList: newUsers });
  };

  getUserDataArray = () => {
    const { taskName, deadLine, description, startDate, touched } = this.state;
    return [
      {
        value: taskName,
        title: 'Task Name',
        isValid: !!setMinLengthRequired(taskName, 5) || !touched.taskName,
        errorMessage: errorTitle(5).minLength,
      },
      {
        value: description,
        title: 'Description',
        isValid: !!setMinLengthRequired(description, 10) || !touched.description,
        errorMessage: errorTitle(10).minLength,
      },
      {
        value: startDate,
        title: 'Start Date',
        inputType: 'date',
        isValid: startDate <= deadLine || !touched.startDate,
        errorMessage: 'Start Date should be less or equal "Dead Line"',
      },
      {
        value: deadLine,
        title: 'Dead Line',
        inputType: 'date',
        isValid: deadLine >= startDate || !touched.deadLine,
        errorMessage: 'Dead Line should be more or equal "Start Date"',
      },
    ];
  };

  onSubmitHandler = (data, users, index, type) => () => {
    const { onSubmit } = this.props;
    console.log();
    onSubmit(data, users, index, type);
  };

  onCloseHandler = () => {
    const { onClose } = this.props;
    onClose();
  };

  renderItems = () => {
    const { type } = this.props;
    const currentUsers = this.getUserDataArray();
    return currentUsers.map(({ value, title, isValid, inputType, errorMessage }) =>
      type === 'details' ? (
        <Label value={value} title={title} />
      ) : (
        <Input
          errorMessage={errorMessage}
          value={value}
          title={title}
          isValid={!!isValid}
          type={inputType}
          onChange={this.getInputValue}
        />
      ),
    );
  };

  getModal = (index, type) => {
    const { taskName, deadLine, description, startDate, userList, users, touched, isValid } = this.state;
    const currentUsers = type === 'create' ? userList : users;
    const detailsUsers = users.filter((user) => user.isCheck);

    return (
      <div className={classes.container}>
        {this.renderItems()}
        {type === 'details' ? (
          <div className={classes.selectedUsers}>
            {detailsUsers.map((user) => (
              <Label key={user.name} value={user.name} />
            ))}
          </div>
        ) : (
          <Checkbox
            isValid={isCheckBoxValueRequired(currentUsers) || !touched.checkbox}
            checkHandler={type === 'create' ? this.setCreateCheckedUser : this.setCheckedUser}
            users={currentUsers}
          />
        )}
        <div className={classes.btnGroup}>
          <Button
            disabled={!isValidForm(isValid)}
            typeButton='primary'
            onClick={this.onSubmitHandler({ taskName, deadLine, description, startDate }, currentUsers, index, type)}
          >
            Create
          </Button>
          <Button typeButton='default' onClick={this.onCloseHandler}>
            Back To List
          </Button>
        </div>
      </div>
    );
  };

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
