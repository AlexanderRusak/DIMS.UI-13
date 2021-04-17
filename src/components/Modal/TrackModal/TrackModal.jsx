import { Component } from 'react';
import { Button } from '../../UI/Buttons/Button/Button';
import { Input } from '../../UI/Input/Input';
import classes from './TrackModal.module.css';

export class TrackModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /*        isValid: false, */
      value: {
        Task: '',
        Note: '',
        Date: '',
      },
    };
  }

  onValueHandler = (event) => {
    const { value } = this.state;
    console.log(event.target.parentElement.innerText);
    this.setState({ value: { ...value, [event.target.parentElement.innerText]: event.target.value } });
  };

  saveHandler = () => {
    const { value } = this.state;
    console.log(value);
  };

  cancelHandler = () => {
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;

    return (
      <div className={classes.TrackModal}>
        <h5>Task track</h5>
        <div>
          <Input
            value={value}
            onChange={(event) => {
              this.onValueHandler(event);
            }}
            title='Task'
          />
          <Input
            value={value}
            onChange={(event) => {
              this.onValueHandler(event);
            }}
            title='Note'
          />
          <Input
            value={value}
            onChange={(event) => {
              this.onValueHandler(event);
            }}
            title='Date'
            type='date'
          />
          <div>
            <Button onClick={this.saveHandler}>
              <p>Save</p>
            </Button>
            <Button onClick={this.cancelHandler}>
              <p>Cancel</p>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
