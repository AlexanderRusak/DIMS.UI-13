import { Component } from 'react';
import { Button } from '../../components/UI/Buttons/Button/Button';
/* import PropTypes from 'prop-types';
import { getRefFirebase } from '../../firebase/helpers';
import { setDataToLS } from '../../localStorage/localStorageFunctions';
import { PROGRESS } from '../../db/tableName'; */
import classes from './TableStyle.module.css';

class MemebersTracks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    /*     this.getData(); */
  }

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
        <li className={classes.actions}>
          <Button>
            <p>Edit</p>
          </Button>
          <Button>
            <p>Delete</p>
          </Button>
        </li>
      </ul>
    </div>
  );

  /*   getTable = () => {
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
      }; */

  render() {
    const { data } = this.state;
    /* const { location } = this.props; */
    /*     const selectedProgress = data.filter(item => item.UserID === location.emailId); */

    const { UserName } = data[0] || '';

    return (
      <>
        <h4>{UserName} Progress</h4>
        {this.getTableHeader()}
        {/* {selectedProgress.map((row, index) => this.getTable(row, index))} */}
      </>
    );
  }
}

MemebersTracks.propTypes = {};
MemebersTracks.defaultProps = {};

export default MemebersTracks;
