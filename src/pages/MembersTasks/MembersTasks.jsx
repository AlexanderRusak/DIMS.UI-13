import { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getData } from '../../firebase/firebase';
import { TableHeader } from '../../components/Table/TableHeader';
import { TableBody } from '../../components/Table/TableBody';
import { LinkButton } from '../../components/LinkButton/LinkButton';
import { Table } from '../../hoc/Table/Table';
import { TASKS } from '../../db/tableName';
import classes from '../TableStyle.module.css';
import { ButtonGroup } from '../../components/ButtonGroup/ButtonGroup';
import { getActiveButtonStyle } from './MembersTasksHelper';
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
    console.log(role, email);
    this.getData();

    this.setState({
      role,
      email,
      buttons: this.getButtons()
    })

  }

  changeTaskState = (index, type, name) => () => {
    const { data } = this.state;
    const newData = [...data];
    newData[index].state = name;
    this.setState({ data: newData });
  }

  getButtons = () => {
    const { data } = this.state;
    console.log();
    const activeStyle = getActiveButtonStyle(data);
    console.log(activeStyle);

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
        styles: activeStyle[0],
        types: ['active', 'success', 'fail'],
        data,
        onClick: this.changeTaskState,
      },
      {
        component: ButtonGroup,
        styles: activeStyle[1],
        types: ['active', 'success', 'fail'],
        data,
        onClick: this.changeTaskState,
      },
    ];
  };

  getData = async () => {
    const data = await getData(TASKS);
    console.log(data);
    this.setState({
      data,
    });
  };

  render() {
    const { data, role, email, buttons } = this.state;
    console.log(buttons);

    const userData = role === 'member' ? data.filter((arr) => {
      return arr.userId === email;
    }) : data;

    return (
      <>
        <LinkButton pathname='/members' title='Back to list' styles={`${classes.button} ${classes.back}`} />
        {  data.length && <Table>
          <TableHeader items={['#', 'Task Name', 'Description', 'DeadLine', 'State', 'Track']} />
          <TableBody
            items={userData}
            header={['#', 'Task Name', 'Description', 'DeadLine', 'State', 'Track']}
            buttons={role === 'member' ? [buttons[0]] : [buttons[1], buttons[2]]}
          />
        </Table>}
      </>
    );
  }
}

MemebersTasks.propTypes = {
  location: PropTypes.shape({ emailId: PropTypes.string }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
MemebersTasks.defaultProps = {};

MemebersTasks.contextType = RoleContext;

export default withRouter(MemebersTasks);
