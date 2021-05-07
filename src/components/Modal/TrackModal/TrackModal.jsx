import { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup } from '../../ButtonGroup/ButtonGroup';
import { Input } from '../../UI/Input/Input';
import { setMinLengthRequired, errorTitle, getCurrentDateUTC } from '../../Validation/validationHelpers';
import { Label } from '../../UI/Label/Label';
import { Button } from '../../UI/Buttons/Button/Button';
import { toTrim, toLowerCaseFirstLetter, isValidFormCreateNewUsers } from '../modalHelpers/helpers';
import buttonClasses from '../../../pages/TableStyle.module.css';
import classes from './TrackModal.module.css';

export class TrackModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
      value: {
        task: '',
        note: '',
        date: '',
      },
      touched: {
        task: false,
        note: false,
        date: false,
      },
    };
  }

  componentDidMount() {
    const { selectedItem } = this.props;
    this.setState({
      value: {
        task: selectedItem ? selectedItem.task : '',
        note: selectedItem ? selectedItem.note : '',
        date: selectedItem ? selectedItem.date : '',
      },
    });
  }

  getInputData = () => {
    const { value } = this.state;
    return [
      {
        title: 'Task',
        type: 'text',
        isValid: setMinLengthRequired(value.task, 3),
        errorMessage: errorTitle(3).minLength,
      },
      {
        title: 'Note',
        type: 'text',
        isValid: setMinLengthRequired(value.note, 5),
        errorMessage: errorTitle(5).minLength,
      },
      {
        title: 'Date',
        type: 'date',
        isValid: getCurrentDateUTC(value.date),
        errorMessage: 'Date should not be in past    ',
      },
    ];
  };

  onValueHandler = (event) => {
    const { value, touched } = this.state;
    const inputValue = event.target.value;
    const elementName = toLowerCaseFirstLetter(toTrim(event.target.attributes[1].nodeValue));
    this.setState({ value: { ...value, [elementName]: inputValue }, touched: { ...touched, [elementName]: true } });
    console.log({ ...this.state });
  };

  renderInputs = () => {
    const { touched, value } = this.state;
    const { mode } = this.props;
    return this.getInputData().map((inputItem) => {
      const el = toLowerCaseFirstLetter(toTrim(inputItem.title));
      return mode === 'details' ? (
        <Label title={inputItem.title} value={value[el]} />
      ) : (
        <Input
          value={value[el]}
          key={inputItem.title}
          onChange={this.onValueHandler}
          title={inputItem.title}
          type={inputItem.type || 'text'}
          isValid={!touched[el] || inputItem.isValid}
          errorMessage={inputItem.errorMessage}
        />
      );
    });
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
    const { isValid, value } = this.state;
    const { mode } = this.props;
    console.log(!isValidFormCreateNewUsers(value));

    return (
      <div className={classes.TrackModal}>
        <h5>Task track</h5>
        <div>
          <this.renderInputs /> {/* move to comp */}
          <div className={classes.btnGroup}>
            {mode !== 'details' && (
              <Button
                styles={`${isValid ? buttonClasses.button : buttonClasses.disabled}`}
                disabled={!isValidFormCreateNewUsers(value)}
                onClick={this.saveHandler}
              >
                Save
              </Button>
            )}
            <ButtonGroup styles={`${buttonClasses.back}`} onClick={this.cancelHandler} title='Back To List' />
          </div>
        </div>
      </div>
    );
  }
}

TrackModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  mode: PropTypes.string,
  selectedItem: PropTypes.shape({
    task: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }),
};
TrackModal.defaultProps = {
  selectedItem: null,
  mode: '',
};
