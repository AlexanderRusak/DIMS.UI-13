import { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getData, setData } from '../../firebase/firebase';
import { TableHeader } from '../../components/Table/TableHeader';
import { TableBody } from '../../components/Table/TableBody';
import { LinkButton } from '../../components/LinkButton/LinkButton';
import { Table } from '../../hoc/Table/Table';
import { TASKS } from '../../db/tableName';
import classes from '../TableStyle.module.css';
import { ButtonGroup } from '../../components/ButtonGroup/ButtonGroup';
/* import { getActiveButtonStyle } from './MembersTasksHelper'; */
import { RoleContext } from '../../hoc/RoleContext/RoleContext';

class MemebersTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      role: '',
      email: '',
    };
  }

  componentDidMount() {
    const { role, email } = this.context;
    /*    console.log(role, email); */
    this.getData();

    this.setState({
      role,
      email,
      /*       buttons: this.getButtons() */
    });
  }

  changeTaskState = (index, name) => () => {
    const { data } = this.state;
    const newData = [...data];
    newData[index].status = name;
    console.log(index, name);
    this.setState({ data: newData });
    setData(TASKS, newData[index], index + 1);
  };

  getButtons = () => {
    const { data } = this.state;

    return [
      {
        component: LinkButton,
        styles: `${classes.button} ${classes.default}`,
        title: 'Create',
        pathname: '/members-tracks',
        emailId: null,
      },
      {
        component: ButtonGroup,
        styles: [],
        types: ['active', 'success', 'fail'],
        data,
        onClick: this.changeTaskState,
      },
      {
        component: ButtonGroup,
        styles: [],
        types: ['active', 'success', 'fail'],
        data,
        onClick: this.changeTaskState,
      },
    ];
  };

  getData = async () => {
    const data = await getData(TASKS);
    /*     console.log(data); */
    this.setState({
      data,
    });
  };

  render() {
    const { data, role, email } = this.state;

    const userData =
      role === 'member'
        ? data.filter((arr) => {
            return arr.userId === email;
          })
        : data;

    return (
      <>
        <LinkButton pathname='/members' title='Back to list' styles={`${classes.button} ${classes.back}`} />
        <Table>
          <TableHeader
            items={['#', 'Task Name', 'Description', 'DeadLine', 'State', role !== 'member' ? 'Active' : 'Track']}
          />
          <TableBody
            items={userData}
            header={['#', 'Task Name', 'Description', 'DeadLine', 'Status', 'Track']}
            buttons={role === 'member' ? [this.getButtons()[0]] : [this.getButtons()[1], this.getButtons()[2]]}
          />
        </Table>
      </>
    );
  }
}

MemebersTasks.propTypes = {
  location: PropTypes.shape({ emailId: PropTypes.string }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  /*   match: PropTypes.shape().isRequired, */
};
MemebersTasks.defaultProps = {};

MemebersTasks.contextType = RoleContext;

export default withRouter(MemebersTasks);
