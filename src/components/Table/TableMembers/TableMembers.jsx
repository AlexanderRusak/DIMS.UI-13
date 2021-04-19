import PropTypes from 'prop-types';
import { Component } from 'react';
import { ModalCreateUpdate } from '../../Modal/ModalCreateUpdate';
import { Button } from '../../UI/Buttons/Button/Button';
import classes from '../Table.module.css';

export class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  closeModalHandler = () => {
    this.setState({ isOpen: false });
  };

  openModalHandler = () => {
    const { isOpen } = this.state;

    this.setState({ isOpen: !isOpen });
  };

  render() {
    const { data } = this.props;
    const { isOpen } = this.state;
    const { FullName, Direction, Education, Age } = data;
    const cls = [classes.button, classes.delete];

    return (
      <>
        <div className={classes.Table}>
          <ul>
            <li>
              <p>{1}</p>
            </li>
            <li>
              <p>{FullName}</p>
            </li>
            <li>
              <p>{Direction}</p>
            </li>
            <li>
              <p>{Education}</p>
            </li>
            <li className={classes.age}>
              <p>{Age}</p>
            </li>
            <li className={classes.actions}>
              <Button className={classes.button}>
                <p className={classes.fontButton}>Progress</p>
              </Button>
              <Button className={classes.button}>
                <p className={classes.fontButton}>Tasks</p>
              </Button>
              <Button className={classes.button} onClick={this.openModalHandler}>
                <p className={classes.fontButton}>Edit</p>
              </Button>
              <Button className={cls.join(' ')}>
                <p className={classes.fontButton}>Delete</p>
              </Button>
            </li>
          </ul>
        </div>
        <ModalCreateUpdate onClose={this.closeModalHandler} isOpen={isOpen} />
      </>
    );
  }
}

Table.propTypes = {
  data: PropTypes.shape({
    FullName: PropTypes.string.isRequired,
    Direction: PropTypes.string.isRequired,
    Education: PropTypes.string.isRequired,
    Age: PropTypes.string.isRequired,
  }).isRequired,
};
