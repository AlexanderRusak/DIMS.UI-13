import { Component } from 'react';
import { TrackModal } from '../../components/Modal/TrackModal/TrackModal';
import { Button } from '../../components/UI/Buttons/Button/Button';
import { ButtonGroup } from '../../components/ButtonGroup/ButtonGroup';
import { defaultProps } from '../../defaultValues/default';
import noop from '../../shared/noop';
import classes from './TableStyle.module.css';

const selectedProgress = [
  { task: 'create db', note: 'create', date: '2020-04-15' },
  {
    task: 'create db',
    note: 'create',
    date: '2020-04-25',
  },
];
const buttons = [

  { style: classes.warning, title: 'Edit', type: 'edit' },
  { style: classes.danger, title: 'Delete', type: 'delete' },
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

  onClick = () => {
    this.openModal()
  }

  closeModal = () => {
    this.setState({ isOpen: false });
  };

  getButtonActions = (elementIndex) => {
    return buttons.map((button) => (
      <ButtonGroup key={button.type} className={button.style} index={elementIndex} onClick={this.onClick}>
        <p>{button.title}</p>
      </ButtonGroup>
    ));
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

  getTable = (item, index) => (
    <div className={classes.TableStyle}>
      <ul className={classes.table}>
        <li>
          <p>{index + 1}</p>
        </li>
        <li>
          <i
            tabIndex={defaultProps.tabIndex}
            aria-label={defaultProps.ariaLabel}
            type={defaultProps.type}
            role='button'
            onClick={() => this.openModal('details', index)}
            onKeyPress={noop}
          >
            {item.task}
          </i>
        </li>
        <li>
          <p>{item.note}</p>
        </li>
        <li className={classes.date}>
          <p>{item.date}</p>
        </li>
        <li className={classes.actions}>
          {this.getButtonActions(index)}
        </li>
      </ul>
    </div>
  );

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
