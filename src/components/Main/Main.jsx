import { PureComponent } from "react";
/* import PropTypes from 'prop-types'; */
import { Switch } from 'react-router-dom';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';
import Members from '../../pages/Members/Members';
import MembersTasks from '../../pages/MembersTasks/MembersTasks';
/* import MemberTasks from '../../pages/MembersTasks/MemberTasks'; */
import MemberTracks from '../../pages/MembersTracks/MemberTracks';
import MembersProgress from '../../pages/Progress/MembersProgress';
import { Tasks } from '../../pages/Tasks/Tasks';
import { SignIn } from '../../pages/SignIn/SignIn';
import { About } from "../../pages/About/About";
import Layout from '../../hoc/Layout';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { getRefFirebase } from "../../firebase/helpers";
import { MEMBERS } from "../../db/tableName";
import classes from "./Main.module.css";
import { RoleContext } from "../../hoc/RoleContext/RoleContext";



export class Main extends PureComponent {

    state = {
        data: [],
        isLogged: false,
        role: '',
        email: ''
    }

    componentDidMount() {
        this.getData();
        this.setState({
            isLogged: JSON.parse(localStorage.getItem('isLogged')),
            data: JSON.parse(localStorage.getItem('isLogged')) ? this.getData() : []
        })
    }

    onClickHandlerSignInResult = (email) => {
        const { data } = this.state;
        const { role } = data[email];
        const members = Object.values(data).filter(user => user.role === 'member');
        localStorage.setItem('role', role.toString());
        localStorage.setItem('email', email.toString());
        localStorage.setItem('data', JSON.stringify(data));
        this.setState({
            isLogged: !!email,
            role,
            email,
            data: members,
        })
    }

    getData = () => {
        getRefFirebase(MEMBERS).onSnapshot((doc) => {
            const members = doc.data() || [];

            this.setState({
                data: members
            });
        });
    };

    render() {
        const { isLogged, role } = this.state;

        return (
            <Switch>
                <RoleContext.Provider value={{ ...this.state }} >
                    <PrivateRoute path='/signin' redirectPath='/about' component={() => <SignIn onClick={this.onClickHandlerSignInResult} />} condition={!isLogged} />
                    <Layout>
                        <Header />
                        <div className={classes.Main}>
                            <PrivateRoute path='/about' component={About} condition={isLogged} />
                            {/* <PrivateRoute path='/members-tasks/:userName' component={MemberTasks} condition={isLogged} /> */}
                            <PrivateRoute path='/members-tasks/:userName' component={MembersTasks} condition={isLogged} />
                            <PrivateRoute path='/members-progress/:userName' component={MembersProgress} condition={isLogged} />
                            <PrivateRoute path='/members' component={Members} condition={isLogged} />
                            <PrivateRoute path='/members-tracks' component={MemberTracks} condition={isLogged} />
                            <PrivateRoute path='/tasks' component={Tasks} condition={isLogged && role !== 'member'} />
                        </div>
                        <Footer />
                    </Layout>
                </RoleContext.Provider>
            </Switch>
        )
    }

}

Main.propTypes = {}
