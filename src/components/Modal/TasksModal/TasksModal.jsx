import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../UI/Buttons/Button/Button';
import { Checkbox } from '../../UI/CheckBox/Checkbox';
import { Input } from '../../UI/Input/Input';
import { toLowerCaseFirstLetter, toTrim } from '../modalHelpers/helpers';
import classes from './TasksModal.module.css';
import { Label } from '../../UI/Label/Label';
import { setMinLengthRequired, isCheckBoxValueRequired, isValidForm } from '../../Validation/validationHelpers';
import { getUserDataArray } from './helpers';

export class TasksModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      users: [...props.users],
      /*       userList: props.users.map((user) => {
              return { name: user.name, isCheck: false };
            }), */
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
    console.log(data.data[index].users);

    this.setState({
      taskName: type !== 'create' ? data.data[index].taskName : '',
      description: type !== 'create' ? data.data[index].description : '',
      startDate: type !== 'create' ? data.data[index].startDate : '',
      deadLine: type !== 'create' ? data.data[index].deadLine : '',
      userList: type !== 'create' ? data.data[index].users : [],
      isValid: {
        taskName: type === 'edit' ? !!data.data[index].taskName : false,
        description: type === 'edit' ? !!data.data[index].description : false,
        startDate: type === 'edit' ? !!data.data[index].startDate : false,
        deadLine: type === 'edit' ? !!data.data[index].deadLine : false,
        checkbox: type === 'edit' ? !!users : false,
      },
      touched: {
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
    const { userList } = this.state;
    const newUsers = [...userList];
    newUsers[index].isCheck = !userList[index].isCheck;
    this.setValid('checkbox', isCheckBoxValueRequired(newUsers));
    this.setTouched('checkbox');
    this.setState({ userList: newUsers });
  };

  setCreateCheckedUser = (index) => {
    const { userList } = this.state;
    const newUsers = [...userList];
    newUsers[index].isCheck = !userList[index].isCheck;
    this.setValid('checkbox', isCheckBoxValueRequired(newUsers));
    this.setTouched('checkbox');
    this.setState({ userList: newUsers });
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
    const currentUsers = getUserDataArray(this.state);
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
    const { isValid, taskName } = this.state;
    console.log(isValid, taskName);

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
