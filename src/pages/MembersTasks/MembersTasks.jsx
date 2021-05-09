import { Component } from 'react';
import PropTypes from 'prop-types';
import { TableHeader } from '../../components/Table/TableHeader';
import { TableBody } from '../../components/Table/TableBody';
import { LinkButton } from '../../components/LinkButton/LinkButton';
import { Table } from '../../hoc/Table/Table';
import { TASKS } from '../../db/tableName';
import classes from '../TableStyle.module.css';
import { getRefFirebase } from '../../firebase/helpers';
import { ButtonGroup } from '../../components/ButtonGroup/ButtonGroup';

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

    this.setState({
      role: localStorage.getItem('role'),
      email: localStorage.getItem('email'),
    })

    this.getData();
  }

  changeTaskState = (index, type, name) => () => {
    console.log(index, type, name);
  }

  getButtons = () => {
    const { data } = this.state;
    console.log(data);


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
        styles: `${classes.button} ${classes.default}`,
        /*         title: 'Active',
                type: 'active', */
        types: ['active', 'success', 'fail'],
        data,
        onClick: this.changeTaskState,
      },
      {
        component: ButtonGroup,
        styles: `${classes.button} ${classes.danger}`,
        /*         title: 'Fail',
                type: 'fail', */
        types: ['active', 'success', 'fail'],
        data,
        onClick: this.changeTaskState,
      },
    ];
  };

  getData = () => {
    getRefFirebase(TASKS).onSnapshot((doc) => {
      const { tasksMembers: data } = doc.data() || [];
      this.setState({
        data,
      });
    });
  };

  render() {
    const { data, role, email } = this.state;
    const userData = role === 'member' ? data.filter((arr) => {
      return arr.userId === email;
    }) : data;





    return (
      <>
        <Table>
          <TableHeader items={['#', 'Task Name', 'Description', 'DeadLine', 'State', 'Track']} />
          <TableBody
            items={userData}
            header={['#', 'Task Name', 'Description', 'DeadLine', 'State', 'Track']}
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
};
MemebersTasks.defaultProps = {};

export default MemebersTasks;
