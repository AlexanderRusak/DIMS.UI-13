import { Component } from 'react';
import { ButtonGroup } from '../../components/ButtonGroup/ButtonGroup';
import { LinkButton } from '../../components/LinkButton/LinkButton';
import { MEMBERS } from '../../db/tableName';
import { Table } from '../../hoc/Table/Table';
import { TableHeader } from '../../components/Table/TableHeader';
import { TableBody } from '../../components/Table/TableBody';
import { DeleteModal } from '../../components/Modal/DeleteModal/DeleteModal';
import { ModalRegisterNewUser } from '../../components/Modal/ModalRegisterNewUsers/ModalRegisterNewUser';
import classes from '../TableStyle.module.css';
import { getRefFirebase } from '../../firebase/helpers';

class Members extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      type: '',
      selectedItem: -1,
      isOpenRegister: false,
      isOpenDelete: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  deleteMember = (index) => {
    const { data } = this.state;
    const newData = Object.values(data);
    newData.splice(index, 1);
    this.setState({ data: newData });
    this.closeModalHandler();
    /* //to db */
  };

  closeModalHandler = () => {
    this.setState({ isOpenRegister: false, isOpenDelete: false, selectedItem: '' });
  };

  openRegisterModalHandler = (index, type) => () => {
    const { isOpenRegister } = this.state;
    this.setState({ isOpenRegister: !isOpenRegister, type, selectedItem: index });
  };

  openDeleteModule = (index) => () => {
    this.setState({ isOpenDelete: true, selectedItem: index });
  };

  getData = () => {
    getRefFirebase(MEMBERS).onSnapshot((doc) => {
      const members = doc.data() || [];
      this.setState({
        data: members,
      });
    });
  };

  opneModal = () => {
    this.setState({ isOpenRegister: true });
  };

  onClose = () => {
    this.setState({ isOpenRegister: false });
  };

  getButtons = () => {
    const { data } = this.state;
    const email = Object.keys(data);
    return [
      {
        component: LinkButton,
        styles: `${classes.button} ${classes.default}`,
        title: 'Progress',
        pathname: '/members-progress',
        emailId: { email },
      },
      {
        component: LinkButton,
        styles: `${classes.button} `,
        title: 'Tasks',
        pathname: '/members-tasks',
        emailId: { email },
      },
      {
        component: ButtonGroup,
        styles: `${classes.button} ${classes.warning}`,
        title: 'Edit',
        type: 'edit',
        onClick: this.openRegisterModalHandler,
      },
      {
        component: ButtonGroup,
        styles: `${classes.button} ${classes.danger}`,
        title: 'Delete',
        onClick: this.openDeleteModule,
      },
    ];
  };

  render() {
    const { data, isOpenRegister, type, selectedItem, isOpenDelete } = this.state;

    return (
      <>
        <ButtonGroup
          title='Register'
          styles={`${classes.registration} ${classes.default}`}
          onClick={this.openRegisterModalHandler(null, 'create')}
        />
        <Table>
          <TableHeader items={['#', 'Full Name', 'Direction', 'Education', 'Age', 'Actions']} />
          <TableBody
            header={['#', 'Full Name', 'Direction', 'Education', 'Age', 'Actions']}
            items={Object.values(data)}
            buttons={this.getButtons()}
          />
        </Table>
        {isOpenRegister && (
          <ModalRegisterNewUser
            editData={type === 'edit' ? Object.values(data)[selectedItem] : {}}
            isOpen={isOpenRegister}
            onClose={this.onClose}
          />
        )}
        {isOpenDelete && (
          <DeleteModal
            onDelete={this.deleteMember}
            onClose={this.closeModalHandler}
            item={selectedItem}
            title='member'
          />
        )}
      </>
    );
  }
}

Members.propTypes = {};
Members.defaultProps = {};

export default Members;
