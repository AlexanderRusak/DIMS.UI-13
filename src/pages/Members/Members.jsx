import { Component } from 'react';
import { ButtonGroup } from '../../components/ButtonGroup/ButtonGroup';
import { RoleContext } from '../../hoc/RoleContext/RoleContext';
import { LinkButton } from '../../components/LinkButton/LinkButton';
import { MEMBERS } from '../../db/tableName';
import { Table } from '../../hoc/Table/Table';
import { defaultProps } from '../../defaultValues/default';
import { TableHeader } from '../../components/Table/TableHeader';
import { TableBody } from '../../components/Table/TableBody';
import { DeleteModal } from '../../components/Modal/DeleteModal/DeleteModal';
import { ModalRegisterNewUser } from '../../components/Modal/ModalRegisterNewUser';
import classes from '../TableStyle.module.css';
import { getRefFirebase } from '../../firebase/helpers';
import noop from '../../shared/noop';

class Members extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      type: '',
      role: '',
      selectedItem: -1,
      isOpenRegister: false,
      isOpenDelete: false,
    };
  }

  componentDidMount() {
    const { role } = this.context;
    this.setState({
      role,
    });
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
        pathname: '/members-progress/:userName',
        emailId: { email },
      },
      {
        component: LinkButton,
        styles: `${classes.button} `,
        title: 'Tasks',
        pathname: '/members-tasks/:userName',
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

  getLink = (name, index) => (
    <i
      tabIndex={defaultProps.tabIndex}
      aria-label={defaultProps.ariaLabel}
      type={defaultProps.type}
      role='button'
      onClick={this.openRegisterModalHandler(index, 'details')}
      onKeyPress={noop}
    >
      {name}
    </i>
  );

  render() {
    const { data, isOpenRegister, type, selectedItem, isOpenDelete, role } = this.state;

    return (
      <>
        {role === 'admin' && (
          <ButtonGroup
            title='Register'
            styles={`${classes.registration} ${classes.default}`}
            onClick={this.openRegisterModalHandler(null, 'create')}
          />
        )}
        <Table>
          <TableHeader items={['#', 'Full Name', 'Direction', 'Education', 'Age', 'Actions']} />
          <TableBody
            header={['#', 'Full Name', 'Direction', 'Education', 'Age', 'Actions']}
            items={Object.values(data)}
            buttons={this.getButtons()}
            detailsHeader='fullName'
            detailsComponent={this.getLink}
          />
        </Table>
        {isOpenRegister && (
          <ModalRegisterNewUser
            editData={selectedItem !== null ? Object.values(data)[selectedItem] : {}}
            isOpen={isOpenRegister}
            onClose={this.onClose}
            modalType={type}
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

Members.contextType = RoleContext;

Members.propTypes = {};
Members.defaultProps = {};

export default Members;
