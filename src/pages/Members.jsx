import { Component } from 'react';
import { Table } from '../components/Table/TableMembers/TableMembers';
import { getDataFromLS, setDataToLS } from '../localStorage/localStorageFunctions';
import { MEMBERS } from '../db/tableName';
import classes from './Members.module.css';
import firebase from '../firebase';

class Members extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getTableHeader = () => (
    <div className={classes.Members}>
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
  );

  getData = () => {
    if (getDataFromLS(MEMBERS)) {
      this.setState(() => {
        return {
          data: getDataFromLS(MEMBERS),
        };
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

  render() {
    const { data } = this.state;

    return (
      <>
        {this.getTableHeader()}
        {data.map((row) => (
          <Table data={row} key={row.Email.toString()} />
        ))}
      </>
    );
  }
}

Members.propTypes = {};
Members.defaultProps = {};

export default Members;
