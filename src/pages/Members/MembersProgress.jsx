import { Component } from 'react';
import { getRefFirebase } from '../../firebase/helpers';
import { TableProgress } from '../../components/Table/TableProgress/TableProgress';
import { setDataToLS } from '../../localStorage/localStorageFunctions';
import { PROGRESS } from '../../db/tableName';
import classes from '../Headers.module.css';

class MemebersProgress extends Component {
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
        <li className={classes.date}>
          <p>Date</p>
        </li>
      </ul>
    </div>
  );

  getData = () => {
    getRefFirebase(PROGRESS).onSnapshot((doc) => {
      const { memberProgress } = doc.data();
      setDataToLS(PROGRESS, memberProgress);
      this.setState({
        data: memberProgress,
      });
    });
  };

  render() {
    const { data } = this.state;
    const [UserID] = data;
    return (
      <>
        {this.getTableHeader()}
        {data.map((row) => (
          <TableProgress key={UserID} data={row} />
        ))}
      </>
    );
  }
}

MemebersProgress.propTypes = {};
MemebersProgress.defaultProps = {};

export default MemebersProgress;
