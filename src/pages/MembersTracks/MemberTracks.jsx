import { Component } from 'react';
import { TrackModal } from '../../components/Modal/TrackModal/TrackModal';
import { DeleteModal } from '../../components/Modal/DeleteModal/DeleteModal'
import { Button } from '../../components/UI/Buttons/Button/Button';
import { ButtonGroup } from '../../components/ButtonGroup/ButtonGroup';
import { TableHeader } from '../../components/Table/TableHeader';
import { TableBody } from '../../components/Table/TableBody';
import { Table } from '../../hoc/Table/Table';
import { defaultProps } from '../../defaultValues/default';
import noop from '../../shared/noop';
import classes from '../TableStyle.module.css';

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
      selectedindex: ''
    };
  }

  componentDidMount() { }

  openModal = (index = null, mode) => () => {
    console.log(index, mode);
    this.setState({ isOpen: true, mode, selectedItem: selectedProgress[index], selectedindex: index });
  };

  onDelete = (index) => () => {
    console.log(index);
    selectedProgress.splice(index, 1);
    this.closeModal();
  }

  closeModal = () => {
    this.setState({ isOpen: false, mode: '' });
  };

  getButtonActions = (elementIndex) => {
    return buttons.map((button) => (
      <ButtonGroup key={button.type} className={button.style} index={elementIndex} onClick={this.onClick}>
        <p>{button.title}</p>
      </ButtonGroup>
    ));
  };


  getDetailsComponent = (name, index) => (
    <i
      tabIndex={defaultProps.tabIndex}
      aria-label={defaultProps.ariaLabel}
      type={defaultProps.type}
      role='button'
      onClick={this.openModal(index, 'details')}
      onKeyPress={noop}
    >
      {name}
    </i>)




  getButtons = () => {

    return [
      {
        component: ButtonGroup,
        styles: `${classes.button} ${classes.warning}`,
        title: 'Edit',
        type: 'edit',
        onClick: this.openModal,
      },
      {
        component: ButtonGroup,
        styles: `${classes.button} ${classes.danger}`,
        title: 'Delete',
        type: 'delete',
        onClick: this.openModal,
      },
    ]
  }

  render() {
    const { isOpen, mode, selectedItem, selectedindex } = this.state;
    return (
      <>
        <h4>Task Track</h4>
        <div>
          <Button className={classes.default} onClick={this.openModal('create')}>
            <p>Create</p>
          </Button>
        </div>
        <Table>
          <TableHeader items={['#', 'Task', 'Note', 'Date', 'Actions']} />
          <TableBody
            header={['#', 'Task', 'Note', 'Date', 'Actions']}
            buttons={this.getButtons()}
            items={selectedProgress}
            detailsHeader='Task'
            detailsComponent={this.getDetailsComponent} />
        </Table>
        {isOpen && mode === 'delete' && <DeleteModal onDelete={this.onDelete(selectedindex)} onClose={this.closeModal} title='Track' />}
        {isOpen && mode !== 'delete' && <TrackModal mode={mode} selectedItem={selectedItem} closeModal={this.closeModal} />}
      </>
    );
  }
}

MemebersTracks.propTypes = {};
MemebersTracks.defaultProps = {};

export default MemebersTracks;
