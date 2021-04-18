import { Component } from 'react';
import { Link } from 'react-router-dom';
import { MEMBERS } from '../../db/tableName';
import { Button } from '../../components/UI/Buttons/Button/Button';
import { ModalRegisterNewUser } from '../../components/Modal/ModalRegisterNewUser';
import { ModalEdit } from '../../components/Modal/ModalEdit';
import classes from './TableStyle.module.css';
import { getRefFirebase } from '../../firebase/helpers';

class Members extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isOpenEdit: false,
      isOpenRegister: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  closeModalHandler = () => {
    this.setState({ isOpenEdit: false, isOpenRegister: false });
  };

  openEditModalHandler = () => {
    const { isOpenEdit } = this.state;

    this.setState({ isOpenEdit: !isOpenEdit });
  };

  openRegisterModalHandler = () => {
    const { isOpenRegister } = this.state;

    this.setState({ isOpenRegister: !isOpenRegister });
  };

  getTable = ({ FullName, Direction, Education, Age, Email }, index) => {
    const { isOpenEdit } = this.state;
    return (
      <>
        <div className={classes.TableStyle}>
          <ul className={classes.table}>
            <li>
              <p>{index + 1}</p>
            </li>
            <li>
              <p>{FullName}</p>
            </li>
            <li>
              <p>{Direction}</p>
            </li>
            <li className={classes.education}>
              <p>{Education}</p>
            </li>
            <li className={classes.age}>
              <p>{Age}</p>
            </li>
            <li className={classes.actions}>
              <Link
                to={{
                  pathname: '/members-progress',
                  emailId: Email,
                }}
              >
                <Button className={classes.button}>
                  <p className={classes.fontButton}>Progress</p>
                </Button>
              </Link>
              <Link
                to={{
                  pathname: '/members-tasks',
                  emailId: Email,
                }}
              >
                <Button className={classes.button}>
                  <p className={classes.fontButton}>Tasks</p>
                </Button>
              </Link>
              <Button className={classes.button} onClick={this.openEditModalHandler}>
                <p className={classes.fontButton}>Edit</p>
              </Button>
              <Button className={`${classes.button} ${classes.delete}`}>
                <p className={classes.fontButton}>Delete</p>
              </Button>
            </li>
          </ul>
        </div>
        <ModalEdit onClose={this.closeModalHandler} isOpen={isOpenEdit} />
      </>
    );
  };

  getTableHeader = () => {
    const { isOpenRegister } = this.state;

    return (
      <>
        <Button className={classes.registration} onClick={this.openRegisterModalHandler}>
          <p>Register</p>
        </Button>
        {isOpenRegister && <ModalRegisterNewUser isOpen={isOpenRegister} onClose={this.onClose} />}
        <div className={classes.TableStyle}>
          <ul className={classes.header}>
            <li>
              <p>#</p>
            </li>
            <li>
              <p>Full Name</p>
            </li>
            <li>
              <p>Direction</p>
            </li>
            <li className={classes.education}>
              <p>Education</p>
            </li>
            <li className={classes.age}>
              <p>Age</p>
            </li>
            <li className={classes.actions}>
              <p>Actions</p>
            </li>
          </ul>
        </div>
      </>
    );
  };

  getData = () => {
    getRefFirebase(MEMBERS).onSnapshot((doc) => {
      const members = doc.data() || [];
      this.setState({
        data: members,
      });
    });
  };

  opneModal = () => {
    this.setState({ isOpenEdit: true, isOpenRegister: true });
  };

  onClose = () => {
    this.setState({ isOpenEdit: false, isOpenRegister: false });
  };

  render() {
    const { data } = this.state;
    return (
      <>
        {this.getTableHeader()}
        {Object.values(data).map((row, index) => this.getTable(row, index))}
      </>
    );
  }
}

Members.propTypes = {};
Members.defaultProps = {};

export default Members;
