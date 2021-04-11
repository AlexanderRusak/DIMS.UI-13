import PropTypes from 'prop-types';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { ModalEdit } from '../../Modal/ModalEdit';
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
    const { UserId, FullName, Direction, Education, Age } = data;

    return (
      <>
        <div className={classes.Table}>
          <ul>
            <li>
              <p>{UserId}</p>
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
              <Link
                to={{
                  pathname: '/members-progress',
                  aboutProps: UserId,
                }}
              >
                <Button className={classes.button}>
                  <p className={classes.fontButton}>Progress</p>
                </Button>
              </Link>
              <Link
                to={{
                  pathname: '/members-tasks',
                  id: UserId,
                }}
              >
                <Button className={classes.button}>
                  <p className={classes.fontButton}>Tasks</p>
                </Button>
              </Link>
              <Button className={classes.button} onClick={this.openModalHandler}>
                <p className={classes.fontButton}>Edit</p>
              </Button>
              <Button className={`${classes.button} ${classes.delete}`}>
                <p className={classes.fontButton}>Delete</p>
              </Button>
            </li>
          </ul>
        </div>
        <ModalEdit onClose={this.closeModalHandler} isOpen={isOpen} />
      </>
    );
  }
}

Table.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};
Table.defaultProps = {};
