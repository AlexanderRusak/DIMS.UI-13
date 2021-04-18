import { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../UI/Buttons/Button/Button';
import { Input } from '../../UI/Input/Input';
import classes from './TrackModal.module.css';
import { Label } from '../../UI/Label/Label';

export class TrackModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Task: false,
      Note: false,
      Date: false,
      value: {
        Task: props.mode === 'edit' ? props.selectedItem.TaskName : '',
        Note: props.mode === 'edit' ? props.selectedItem.Note : '',
        Date: props.mode === 'edit' ? props.selectedItem.Date : '',
      },
    };
  }

  onValueHandler = (event, el) => {
    const { value } = this.state;

    this.setState({ [el]: true, value: { ...value, [el]: event.target.value } });
  };

  saveHandler = () => {
    const { value } = this.state;
    const { closeModal } = this.props;
    console.log(value);

    this.setState({ value: '' });
    closeModal();
  };

  cancelHandler = () => {
    const { closeModal } = this.props;
    this.setState({ value: {} });
    closeModal();
  };

  render() {
    const { value, isValid, Note, Task, Date } = this.state;
    const { mode, selectedItem } = this.props;
    console.log(value, isValid, mode);

    return (
      <div className={classes.TrackModal}>
        <h5>Task track</h5>
        <div>
          {mode === 'details' ? (
            <Label value={selectedItem.TaskName} />
          ) : (
            <Input
              value={value.Task}
              onChange={(event) => this.onValueHandler(event, 'Task')}
              title='Task'
              isError={!Task || !!value.Task}
            />
          )}
          {mode === 'details' ? (
            <Label value={selectedItem.Note} />
          ) : (
            <Input
              value={value.Note}
              onChange={(event) => this.onValueHandler(event, 'Note')}
              title='Note'
              type='textarea'
              isError={!Note || !!value.Note}
            />
          )}
          {mode === 'details' ? (
            <Label value={selectedItem.Date} />
          ) : (
            <Input
              value={value.Date}
              onChange={(event) => this.onValueHandler(event, 'Date')}
              title='Date'
              type='date'
              isError={!Date || !!value.Date}
            />
          )}
          <div className={classes.btnGroup}>
            {mode !== 'details' && (
              <Button disabled={!(value.Note && value.Task && value.Date)} onClick={this.saveHandler}>
                <p>Create</p>
              </Button>
            )}
            <Button className={classes.back} onClick={this.cancelHandler}>
              <p>Back To List</p>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

TrackModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  selectedItem: PropTypes.shape({
    TaskName: PropTypes.string.isRequired,
    Note: PropTypes.string.isRequired,
    Date: PropTypes.string.isRequired,
  }),
};
TrackModal.defaultProps = {
  selectedItem: null,
};
