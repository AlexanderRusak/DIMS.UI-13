import { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Checkbox.module.css';
import { Input } from '../Input/Input';

export class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'dsds',
      users: [],
    };
  }

  componentDidMount() {
    const { users } = this.props;
    this.setState({
      users,
    });
  }

  render() {
    const { test, users } = this.state;
    const { checkHandler, isValid, errorMessage } = this.props;

    return (
      <>
        <div className={classes.Checkbox}>
          {users.map((user, index) => (
            <Input
              type='checkbox'
              title={user.name}
              key={user.name.toString()}
              checked={user.isCheck}
              isValid={!!test}
              onChange={() => checkHandler(index)}
            />
          ))}
        </div>
        {!isValid && <span className={classes.error}>{errorMessage || 'Required'}</span>}
      </>
    );
  }
}

Checkbox.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string),
  checkHandler: PropTypes.func.isRequired,
  isValid: PropTypes.bool,
  errorMessage: PropTypes.string,
};

Checkbox.defaultProps = {
  users: [],
  isValid: false,
  errorMessage: 'Requried',
};
