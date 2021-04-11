import { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Alert.module.css';

export default class Alert extends Component {
  constructor(props) {
    super(props);
    const { text } = this.props;
    this.state = {
      isShow: !!text,
      cls: [`${classes.Alert} col col-md-4 alert  alert-dismissible `],
    };
  }

  alertHide = () => {
    setTimeout(() => {
      this.setState({ isShow: false });
    }, 5000);
  };

  render() {
    const { isShow, cls } = this.state;
    const { text } = this.props;
    return (
      <>
        {isShow ? (
          <div className={cls.join(' ')} role='alert'>
            <p>{text}</p>
          </div>
        ) : null}
      </>
    );
  }
}

Alert.propTypes = {
  text: PropTypes.string.isRequired,
};
