import { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Checkbox.module.css';
import { Input } from '../Input/Input';

export class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    const { users } = this.props;
    this.setState({
      users,
    });
  }

  checkBoxHandler = (index) => () => {
    const { checkHandler } = this.props;
    checkHandler(index);
  };

  render() {
    const { users } = this.state;
    const { isValid, errorMessage } = this.props;
    console.log(users);
    return (
      <>
        <div className={classes.Checkbox}>
          {users.map((user, index) => (
            <Input
              type='checkbox'
              title={user.name}
              key={user.name.toString()}
              checked={user.isCheck}
              isValid={!!user.name}
              onChange={this.checkBoxHandler(index)}
            />
          ))}
        </div>
        {!isValid && <span className={classes.error}>{errorMessage || 'Required'}</span>}
      </>
    );
  }
}

Checkbox.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({})),
  checkHandler: PropTypes.func.isRequired,
  isValid: PropTypes.bool,
  errorMessage: PropTypes.string,
};

Checkbox.defaultProps = {
  users: [],
  isValid: false,
  errorMessage: 'Requried',
};
