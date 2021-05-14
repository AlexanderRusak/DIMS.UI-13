import { Component } from 'react';
import PropTypes from 'prop-types';
import { getRefFirebase } from '../../firebase/helpers';
import { setDataToLS } from '../../localStorage/localStorageFunctions';
import { PROGRESS } from '../../db/tableName';
import classes from './TableStyle.module.css';

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
    <div className={classes.TableStyle}>
      <ul className={classes.header}>
        <li>
          <p>#</p>
        </li>
        <li>
          <p>Task Name</p>
        </li>
        <li>
          <p>Track Note</p>
        </li>
        <li className={classes.date}>
          <p>Date</p>
        </li>
      </ul>
    </div>
  );

  getTable = ({ TaskName, TrackNote, TrackDate }, index) => {
    return (
      <div className={classes.TableStyle}>
        <ul className={classes.table}>
          <li>
            <p>{index + 1}</p>
          </li>
          <li>
            <p>{TaskName}</p>
          </li>
          <li>
            <p>{TrackNote}</p>
          </li>
          <li>
            <p>{TrackDate}</p>
          </li>
        </ul>
      </div>
    );
  };

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
    const { location } = this.props;
    const selectedProgress = data.filter((item) => item.UserID === location.emailId);

    const { UserName } = data[0] || '';

    return (
      <>
        <h4>{UserName} Progress</h4>
        {this.getTableHeader()}
        {selectedProgress.map((row, index) => this.getTable(row, index))}
      </>
    );
  }
}

MemebersProgress.propTypes = {
  location: PropTypes.shape({ emailId: PropTypes.string.isRequired }).isRequired,
};
MemebersProgress.defaultProps = {};

export default MemebersProgress;
