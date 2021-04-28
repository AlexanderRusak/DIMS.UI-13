import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../UI/Buttons/Button/Button';
import { Checkbox } from '../../UI/CheckBox/Checkbox';
import { Input } from '../../UI/Input/Input';
import { toLowerCaseFirstLetter, toTrim } from '../modalHelpers/helpers';
import classes from './TasksModal.module.css';
import { Label } from '../../UI/Label/Label';
import { setMinLengthRequired, isCheckBoxValueRequired } from '../../Validation/validationHelpers';

export class TasksModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      users: [...props.users],
      userList: props.users.map((user) => {
        return { name: user.name, isCheck: false };
      }),
      taskName: props.type === 'create' ? '' : props.data[props.index].taskName,
      description: props.type === 'create' ? '' : props.data[props.index].description,
      startDate: props.type === 'create' ? '' : props.data[props.index].startDate,
      deadLine: props.type === 'create' ? '' : props.data[props.index].deadLine,
      touched: {
        taskName: false,
        description: false,
        startDate: false,
        deadLine: false,
        checkbox: false,
      },
    };
  }

  setTouched = (elementName) => {
    const { touched } = this.state;
    const newTouched = { ...touched, [elementName]: true };
    this.setState({ touched: newTouched });
  };

  setCheckedUser = (index) => {
    const { users } = this.state;
    const newUsers = [...users];
    newUsers[index].isCheck = !users[index].isCheck;
    this.setState({ users: newUsers });
  };

  setCreateCheckedUser = (index) => {
    const { userList } = this.state;
    const newUsers = [...userList];
    newUsers[index].isCheck = !userList[index].isCheck;
    console.log(isCheckBoxValueRequired(newUsers));
    this.setTouched();
    this.setState({ userList: newUsers });
  };

  getUserDataArray = () => {
    const { taskName, deadLine, description, startDate, touched } = this.state;
    return [
      { value: taskName, title: 'Task Name', isValid: !!setMinLengthRequired(taskName, 5) || !touched.taskName },
      {
        value: description,
        title: 'Description',
        isValid: !!setMinLengthRequired(taskName, 5) || !touched.description,
      },
      { value: startDate, title: 'Start Date', inputType: 'date', isValid: startDate || !touched.startDate },
      { value: deadLine, title: 'Dead Line', inputType: 'date', isValid: startDate || !touched.startDate },
    ];
  };

  getInputValue = (event) => {
    const elementName = toLowerCaseFirstLetter(toTrim(event.target.attributes[1].nodeValue));
    this.setTouched(elementName);
    this.setState({
      [elementName]: event.target.value,
    });
  };

  onSubmitHandler = (data, users, index, type) => {
    const { onSubmit } = this.props;
    onSubmit(data, users, index, type);
  };

  onCloseHandler = () => {
    const { onClose } = this.props;
    onClose();
  };

  renderItems = () => {
    const { type } = this.props;
    const currentUsers = this.getUserDataArray();
    return currentUsers.map(({ value, title, isValid, inputType }) =>
      type === 'details' ? (
        <Label value={value} title={title} />
      ) : (
        <Input value={value} title={title} isValid={!!isValid} type={inputType} onChange={this.getInputValue} />
      ),
    );
  };

  getModal = (index, type) => {
    const { taskName, deadLine, description, startDate, userList, users } = this.state;
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
            checkHandler={type === 'create' ? this.setCreateCheckedUser : this.setCheckedUser}
            users={currentUsers}
          />
        )}
        <div className={classes.btnGroup}>
          <Button
            typeButton='primary'
            onClick={() =>
              this.onSubmitHandler({ taskName, deadLine, description, startDate }, currentUsers, index, type)
            }
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
  data: PropTypes.shape(),
  index: PropTypes.number,
  users: PropTypes.shape().isRequired,
};
TasksModal.defaultProps = {
  index: null,
  data: null,
};
