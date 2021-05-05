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
    };
  }

  componentDidMount() {
    this.getData();
  }


  getButtons = () => {

    return [
      {
        component: LinkButton,
        styles: `${classes.button} ${classes.default}`,
        title: 'Create',
        pathname: '/members-tracks',
        emailId: null
      }
    ]
  }



  getData = () => {
    getRefFirebase(TASKS).onSnapshot((doc) => {
      const { tasksMembers: data } = doc.data() || [];
      this.setState({
        data
      });
    });
  };

  render() {
    const { data } = this.state;
    const { location } = this.props;
    const newData = data.filter((arr) => {
      return arr.userId === location.emailId;
    });
    console.log(data, location.emailId);

    return (
      <>
        <Table>
          <TableHeader items={['#', 'Task Name', 'Description', 'DeadLine', 'State', 'Track']} />
          <TableBody items={newData} header={['#', 'Task Name', 'Description', 'DeadLine', 'State', 'Track']} buttons={this.getButtons()} />
        </Table>
      </>
    );
  }
}

MemebersTasks.propTypes = {
  location: PropTypes.shape({ emailId: PropTypes.string }).isRequired,
};
MemebersTasks.defaultProps = {};

export default MemebersTasks;
