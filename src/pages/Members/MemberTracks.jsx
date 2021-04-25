import { Component } from 'react';
import { TrackModal } from '../../components/Modal/TrackModal/TrackModal';
import { Button } from '../../components/UI/Buttons/Button/Button';
/* import PropTypes from 'prop-types';
import { getRefFirebase } from '../../firebase/helpers';
import { setDataToLS } from '../../localStorage/localStorageFunctions';
import { PROGRESS } from '../../db/tableName'; */
import classes from './TableStyle.module.css';

const selectedProgress = [
  { taskName: 'create db', note: 'create', date: '2020-04-15', },
  {
    taskName: 'create db',
    note: 'create',
    date: '2020-04-25',
  },
];

class MemebersTracks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      mode: '',
      selectedItem: null,
    };
  }

  componentDidMount() { }

  openModal = (mode, index = null) => {
    this.setState({ isOpen: true, mode, selectedItem: selectedProgress[index] });
  };

  closeModal = () => {
    this.setState({ isOpen: false });
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
            <i
              aria-label='button'
              type='button'
              role='button'
              tabIndex='0'
              onClick={() => this.openModal('details', index)}
              onKeyPress={() => { }}
            >
              {item.taskName}
            </i>
          </li>
          <li>
            <p>{item.Note}</p>
          </li>
          <li className={classes.date}>
            <p>{item.date}</p>
          </li>
          <li className={classes.actions}>
            <Button className={classes.warning} onClick={() => this.openModal('edit', index)}>
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
    const { isOpen, mode, selectedItem } = this.state;
    return (
      <>
        <h4>Task Track</h4>
        <div>
          <Button className={classes.default} onClick={() => this.openModal('create')}>
            <p>Create</p>
          </Button>
        </div>

        {this.getTableHeader()}
        {selectedProgress.map((row, index) => this.getTable(row, index))}
        {isOpen && <TrackModal mode={mode} selectedItem={selectedItem} closeModal={this.closeModal} />}
      </>
    );
  }
}

MemebersTracks.propTypes = {};
MemebersTracks.defaultProps = {};

export default MemebersTracks;
