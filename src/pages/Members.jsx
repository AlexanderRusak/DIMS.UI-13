import { Component } from 'react';
import { Table } from '../components/Table/TableMembers/TableMembers';
/* import { getDataFromLS, setDataToLS } from '../localStorage/localStorageFunctions'; */
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
    const ref = firebase.firestore().collection('data').doc(MEMBERS);
    ref.onSnapshot((doc) => {
      const members = doc.data() || [];

      this.setState({
        data: members,
      });
    });
  };

  opneModal = () => {
    this.setState({ isOpen: true });
  };

  onClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { data } = this.state;
    console.log(data, 'data');
    const newData = Object.values(data);

    console.log(newData, 'data');
    /*     const newArrData = [data]; */
    return (
      <>
        {this.getTableHeader()}
        {newData ? newData.map((row) => <Table data={row} />) : null}
      </>
    );
  }
}

Members.propTypes = {};
Members.defaultProps = {};

export default Members;
