import { Component } from 'react';
import PropTypes from 'prop-types';
import { TableHeader } from '../../components/Table/TableHeader';
import { TableBody } from '../../components/Table/TableBody';
import { LinkButton } from '../../components/LinkButton/LinkButton';
import { Table } from '../../hoc/Table/Table';
import { TASKS } from '../../db/tableName';
import classes from '../TableStyle.module.css';
import { getRefFirebase } from '../../firebase/helpers';

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
    this.setState({
      role,
      email
    })

    this.getData();
  }

  getButtons = () => {
    return [
      {
        component: LinkButton,
        styles: `${classes.button} ${classes.default}`,
        title: 'Create',
        pathname: '/members-tracks',
        emailId: null,
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
    console.log(data, role, email);
    const userData = role === 'member' ? data.filter((arr) => {
      return arr.userId === email;
    }) : data;





    return (
      <>
        <Table>
          <TableHeader items={['#', 'Task Name', 'Description', 'DeadLine', 'State', 'Track']} />
          <TableBody
            items={newData}
            header={['#', 'Task Name', 'Description', 'DeadLine', 'State', 'Track']}
            buttons={this.getButtons()}
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

MemebersTasks.contextType = RoleContext;

export default MemebersTasks;
