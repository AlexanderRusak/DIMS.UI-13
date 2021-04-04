import { Component } from 'react';
import { Table } from '../components/Table/TableMembers/TableMembers';
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
    const ref = firebase.firestore().collection('data').doc('members');
    ref.onSnapshot((doc) => {
      const { members } = doc.data();
      console.log(members);
      this.setState(() => {
        return {
          data: members,
        };
      });
    });
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
