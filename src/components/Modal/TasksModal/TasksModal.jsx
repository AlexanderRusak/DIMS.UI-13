import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../UI/Buttons/Button/Button';
import { Checkbox } from '../../UI/CheckBox/Checkbox';
import { Input } from '../../UI/Input/Input';
import { isNotCreateType, isEditValid } from './helpers';
import { toLowerCaseFirstLetter, toTrim } from '../modalHelpers/helpers';
import classes from './TasksModal.module.css';
import { Label } from '../../UI/Label/Label';
import { setMinLengthRequired, isCheckBoxValueRequired, isValidForm } from '../../Validation/validationHelpers';
import { getUserDataArray } from './taskModalData';

export class TasksModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userList: [],
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
    console.log(users);

    this.setState({
      users: [...users],
      userList: users.map((user) => {
        return { name: user.name, isCheck: false };
      }),

      taskName: isNotCreateType(type, data, index).taskName,
      description: isNotCreateType(type, data, index).description,
      startDate: isNotCreateType(type, data, index).startDate,
      deadLine: isNotCreateType(type, data, index).deadLine,
      isValid: {
        taskName: isEditValid(type, data, index).taskName,
        description: isEditValid(type, data, index).description,
        startDate: isEditValid(type, data, index).startDate,
        deadLine: isEditValid(type, data, index).deadLine,
        checkbox: type === 'edit' ? !!users : false, // i don't know future logic for users
      },
    });
  }

  setTouched = (elementName) => {
    const { touched } = this.state;
    this.setState({ touched: { ...touched, [elementName]: true } });
  };

  setValid = (elementName, validFunc) => {
    console.log(this.state);
    const { isValid } = this.state;
    this.setState({ isValid: { ...isValid, [elementName]: validFunc } });
  };

  getInputValue = (event) => {
    const elementName = toLowerCaseFirstLetter(toTrim(event.target.attributes[1].nodeValue));
    this.setTouched(elementName);
    this.setValid(elementName, setMinLengthRequired(event.target.value, 5));
    this.setState({
      [elementName]: event.target.value,
    });
  };

  setCheckedUser = (index, type) => () => {
    console.log(index, type);
    const { users } = this.state;
    const newUsers = [...users];
    newUsers[index].isCheck = !users[index].isCheck;
    this.setValid('checkbox', isCheckBoxValueRequired(newUsers));
    this.setTouched('checkbox');
    this.setState(type === 'create' ? { users: newUsers } : { userList: newUsers });
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

    return getUserDataArray(this.state).map(({ value, title, isValid, inputType, errorMessage }) =>
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
            checkHandler={this.setCheckedUser(index, type)}
            users={currentUsers}
          />
        )}
        <div className={classes.btnGroup}>
          <Button
            disabled={!isValidForm(isValid)}
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
  index: PropTypes.number,
  users: PropTypes.shape([
    {
      name: PropTypes.string.isRequired,
      isCheck: PropTypes.bool.isRequired,
    },
  ]),
};
TasksModal.defaultProps = {
  index: null,
  users: [],
};
