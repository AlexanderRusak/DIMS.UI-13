import { Component } from 'react';
import { TrackModal } from '../../components/Modal/TrackModal/TrackModal';
import { Button } from '../../components/UI/Buttons/Button/Button';
/* import PropTypes from 'prop-types';
import { getRefFirebase } from '../../firebase/helpers';
import { setDataToLS } from '../../localStorage/localStorageFunctions';
import { PROGRESS } from '../../db/tableName'; */
import classes from './TableStyle.module.css';

const selectedProgress = [
  { TaskName: 'create db', Note: 'create', Date: '12/05/2021' },
  {
    TaskName: 'create db',
    Note: 'create',
    Date: '12/05/2021',
  },
];

class MemebersTracks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /*     data: [], */
      isOpen: false,
    };
  }

  componentDidMount() {
    /*     this.getData(); */
  }

  openCreate = () => {
    this.setState({ isOpen: true });
  };

  getTableHeader = () => (
    <div className={classes.TableStyle}>
      <ul className={classes.header}>
        <li>
          <p>#</p>
        </li>
        <li>
          <p>Task </p>
        </li>
        <li>
          <p>Note</p>
        </li>
        <li className={classes.date}>
          <p>Date</p>
        </li>
        <li className={classes.actions}>Action</li>
      </ul>
    </div>
  );

  getTable = (item, index) => {
    return (
      <div className={classes.TableStyle}>
        <ul className={classes.table}>
          <li>
            <p>{index + 1}</p>
          </li>
          <li>
            <p>{item.TaskName}</p>
          </li>
          <li>
            <p>{item.Note}</p>
          </li>
          <li className={classes.date}>
            <p>{item.Date}</p>
          </li>
          <li className={classes.actions}>
            <Button className={classes.warning}>
              <p>Edit</p>
            </Button>
            <Button className={classes.danger}>
              <p>Delete</p>
            </Button>
          </li>
        </ul>
      </div>
    );
  };

  render() {
    const { isOpen } = this.state;
    /* const { location } = this.props; */
    /*     const selectedProgress = data.filter(item => item.UserID === location.emailId); */

    return (
      <>
        <h4>Task Track</h4>
        <div>
          <Button className={classes.default} onClick={this.openCreate}>
            <p>Create</p>
          </Button>
        </div>

        {this.getTableHeader()}
        {selectedProgress.map((row, index) => this.getTable(row, index))}
        {isOpen && <TrackModal />}
      </>
    );
  }
}

MemebersTracks.propTypes = {};
MemebersTracks.defaultProps = {};

export default MemebersTracks;
