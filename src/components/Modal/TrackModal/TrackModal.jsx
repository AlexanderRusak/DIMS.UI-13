import { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../UI/Buttons/Button/Button';
import { Input } from '../../UI/Input/Input';
import { toTrim, toLowerCaseFirstLetter } from '../modalHelpers/helpers'
import classes from './TrackModal.module.css';
import { Label } from '../../UI/Label/Label';

export class TrackModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: false,
      note: false,
      date: false,
      value: {
        task: props.mode === 'edit' ? props.selectedItem.taskName : '',
        note: props.mode === 'edit' ? props.selectedItem.note : '',
        date: props.mode === 'edit' ? props.selectedItem.date : '',
      },
    };
  }

  onValueHandler = (event) => {
    const { value } = this.state;
    const elementName = toLowerCaseFirstLetter(toTrim(event.target.attributes[1].nodeValue));

    this.setState({ [elementName]: true, value: { ...value, [elementName]: event.target.value } });
  };

  saveHandler = () => {

    const { closeModal } = this.props;

    this.setState({ value: '' });
    closeModal();
  };

  cancelHandler = () => {
    const { closeModal } = this.props;
    this.setState({ value: {} });
    closeModal();
  };

  render() {
    const { value, note, task, date } = this.state;
    const { mode, selectedItem } = this.props;

    return (
      <div className={classes.TrackModal}>
        <h5>Task track</h5>
        <div>
          {mode === 'details' ? (
            <Label value={selectedItem.taskName} />
          ) : (
            <Input
              value={value.Task}
              onChange={this.onValueHandler}
              title='Task'
              isValid={!task || !!value.task}
            />
          )}
          {mode === 'details' ? (
            <Label value={selectedItem.note} />
          ) : (
            <Input
              value={value.note}
              onChange={this.onValueHandler}
              title='Note'
              type='textarea'
              isValid={!note || !!value.note}
            />
          )}
          {mode === 'details' ? (
            <Label value={selectedItem.date} />
          ) : (
            <Input
              value={value.date}
              onChange={this.onValueHandler}
              title='Date'
              type='date'
              isValid={!date || !!value.date}
            />
          )}
          <div className={classes.btnGroup}>
            {mode !== 'details' && (
              <Button disabled={!(value.note && value.task && value.date)} onClick={this.saveHandler}>
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
    taskName: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }),
};
TrackModal.defaultProps = {
  selectedItem: null,
};
