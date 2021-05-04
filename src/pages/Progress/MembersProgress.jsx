import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getRefFirebase } from '../../firebase/helpers';
import { TableHeader } from '../../components/Table/TableHeader';
import { setDataToLS } from '../../localStorage/localStorageFunctions';
import { PROGRESS } from '../../db/tableName';
import { ButtonGroup } from '../../components/ButtonGroup/ButtonGroup';
import classes from '../TableStyle.module.css';
import noop from '../../shared/noop';
import { TableBody } from '../../components/Table/TableBody';

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
    /* const { TaskName, TrackNote, TrackDate } = selectedProgress; */
    const { UserName } = data[0] || '';
    console.log(selectedProgress);

    return (
      <>
        <h4>{UserName} Progress</h4>
        <Link to='/members'>
          <ButtonGroup styles={`${classes.button} ${classes.back}`} title='Back to List' onClick={noop} />
        </Link>
        <TableHeader items={['#', 'Task Name', 'Track Note', 'Date']} />
        <TableBody header={['#', 'Task Name', 'Track Note', 'Track Date']} items={selectedProgress} />
      </>
    );
  }
}

MemebersProgress.propTypes = {
  location: PropTypes.shape({ emailId: PropTypes.string.isRequired }).isRequired,
};
MemebersProgress.defaultProps = {};

export default MemebersProgress;
