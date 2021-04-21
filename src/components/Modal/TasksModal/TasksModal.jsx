import { Component } from 'react';
import { Button } from '../../UI/Buttons/Button/Button';
import { Checkbox } from '../../UI/CheckBox/Checkbox';
import { Input } from '../../UI/Input/Input';
import classes from './TasksModal.module.css';

export class TasksModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'rerre',
      fakeUsers: [
        { name: 'John Travolta', isCheck: false },
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

  render() {
    const { fakeUsers, test } = this.state;

    return (
      <div className={classes.TasksModal}>
        <div className={classes.container}>
          <Input title='Name' isError={!!test} />
          <Input title='Description' isError={!!test} />
          <Input title='Start Date' isError={!!test} type='date' />
          <Input title='Deadline' isError={!!test} type='date' />
          <Checkbox checkHandler={this.getCheckedUser} users={fakeUsers} />
          <div>
            <Button>TEST</Button>
            <Button>Back To List</Button>
          </div>
        </div>
      </div>
    );
  }
}
