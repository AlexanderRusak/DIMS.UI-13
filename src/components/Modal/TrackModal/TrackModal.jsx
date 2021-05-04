import { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../UI/Buttons/Button/Button';
import { Input } from '../../UI/Input/Input';
import { toTrim, toLowerCaseFirstLetter } from '../modalHelpers/helpers';
import classes from './TrackModal.module.css';
import { Label } from '../../UI/Label/Label';

export class TrackModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { selectedItem, mode } = this.props;
    this.setState({
      value: {
        task: mode === 'edit' ? selectedItem.task : '',
        note: mode === 'edit' ? selectedItem.note : '',
        date: mode === 'edit' ? selectedItem.date : '',
      },
    });
  }

  renderField = () => {
    const { mode, selectedItem } = this.props;
    const { value, touched } = this.state;
    const fields = Object.entries(selectedItem || value);
    const currentFields =
      mode === 'details'
        ? fields.map((field, index) => <Label title={fields[index][0]} value={fields[index][1]} />)
        : fields.map((field, index) => (
            <Input
              field={field}
              title={fields[index][0]}
              onChange={this.onValueHandler}
              value={value[fields[index][0]]}
              isValid={value[fields[index][0]] || !touched[fields[index][0]]}
            />
          ));
    return currentFields;
  };

  onValueHandler = (event) => {
    const { value } = this.state;
    const elementName = toLowerCaseFirstLetter(toTrim(event.target.attributes[1].nodeValue));

    this.setState({ touched: { [elementName]: true }, value: { ...value, [elementName]: event.target.value } });
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
    const { value } = this.state;
    const { mode } = this.props;
    return (
      <div className={classes.TrackModal}>
        <h5>Task track</h5>
        <div>
          {this.renderField()}
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
    task: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }),
};
TrackModal.defaultProps = {
  selectedItem: null,
};
