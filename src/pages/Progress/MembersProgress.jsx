import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
/* import { getRefFirebase } from '../../firebase/helpers'; */
import { getData } from '../../firebase/firebase';
import { TableHeader } from '../../components/Table/TableHeader';
/* import { setDataToLS } from '../../localStorage/localStorageFunctions'; */
import { TASKS } from '../../db/tableName';
import { ButtonGroup } from '../../components/ButtonGroup/ButtonGroup';
import classes from '../TableStyle.module.css';
import noop from '../../shared/noop';
import { TableBody } from '../../components/Table/TableBody';
import { Table } from '../../hoc/Table/Table';

class MemebersProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { userName } = match.params;
    this.getData(userName);
  }

  getData = async (userName) => {
    const data = await getData(TASKS);
    this.setState({
      data: data.filter((task) => task.users.find((user) => user.name === userName && user.isCheck)),
      userName,
    });
  };

  render() {
    const { userName, data } = this.state;

    console.log(data);

    return (
      <>
        <h4>{userName} Progress</h4>
        <Link to='/members'>
          <ButtonGroup styles={`${classes.button} ${classes.back}`} title='Back to List' onClick={noop} />
        </Link>
        <Table>
          <TableHeader items={['#', 'Task Name', 'Track Note', 'Date']} />
          <TableBody header={['#', 'Task Name', 'Description', 'DeadLine']} items={data} />
        </Table>
      </>
    );
  }
}

MemebersProgress.propTypes = {
  location: PropTypes.shape({ emailId: PropTypes.string.isRequired }).isRequired,
  match: PropTypes.shape().isRequired,
};
MemebersProgress.defaultProps = {};

export default withRouter(MemebersProgress);
