import { Component } from 'react';
import { Table } from '../components/Table/TableMembers/TableMembers';
import { getDataFromLS, setDataToLS } from '../localStorage/localStorageFunctions';
import { MEMBERS } from '../db/tableName';
import { Button } from '../components/UI/Buttons/Button/Button';
import { ModalRegisterNewUser } from '../components/Modal/ModalRegisterNewUser';
import classes from './Headers.module.css';
import firebase from '../firebase/firebase';

class Members extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isOpen: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getTableHeader = () => {
    const { isOpen } = this.state;

    return (
      <>
        <Button className={classes.registration} onClick={this.opneModal}>
          <p>Register</p>
        </Button>
        {isOpen && <ModalRegisterNewUser isOpen={isOpen} onClose={this.onClose} />}
        <div className={classes.Headers}>
          <ul>
            <li>
              <p>#</p>
            </li>
            <li>
              <p>Full Name</p>
            </li>
            <li>
              <p>Direction</p>
            </li>
            <li>
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
    if (getDataFromLS(MEMBERS)) {
      this.setState({
        data: getDataFromLS(MEMBERS),
      });
    } else {
      const ref = firebase.firestore().collection('data').doc(MEMBERS);
      ref.onSnapshot((doc) => {
        const { members } = doc.data();
        setDataToLS(MEMBERS, members);
        this.setState({
          data: members,
        });
      });
    }
  };

  opneModal = () => {
    this.setState({ isOpen: true });
  };

  onClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { data } = this.state;

    return (
      <>
        {this.getTableHeader()}
        {data.map((row) => (
          <Table data={row} />
        ))}
      </>
    );
  }
}

Members.propTypes = {};
Members.defaultProps = {};

export default Members;
