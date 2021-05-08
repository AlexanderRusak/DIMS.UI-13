import { PureComponent } from "react";
/* import PropTypes from 'prop-types'; */
import { Switch } from 'react-router-dom';
import { RoleContext } from '../../hoc/RoleContext/RoleContext';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';
import Members from '../../pages/Members/Members';
import MembersTasks from '../../pages/MembersTasks/MembersTasks';
import MemberTracks from '../../pages/MembersTracks/MemberTracks';
import MembersProgress from '../../pages/Progress/MembersProgress';
import { Tasks } from '../../pages/Tasks/Tasks';
import { SignIn } from '../../pages/SignIn/SignIn';
import Layout from '../../hoc/Layout';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { getRefFirebase } from "../../firebase/helpers";
import { MEMBERS } from "../../db/tableName";
import classes from "./Main.module.css";



export class Main extends PureComponent {

    state = {
        isLogged: false,
        data: [],
        /*         role: '', */
    }

    componentDidMount() {
        this.getData();
    }

    onClickHandlerSignInResult = (email) => {
        const { isLogged, data } = this.state;
        this.setState({ isLogged: !isLogged });
        const { role } = data[email];
        sessionStorage.setItem('isLogged', 'true');
        sessionStorage.setItem('role', role.toString());
        console.log(role);
    }

    getData = () => {
        getRefFirebase(MEMBERS).onSnapshot((doc) => {
            const members = doc.data() || [];
            this.setState({
                data: members,
            });
        });
    };

    render() {
        const { isLogged } = this.state;


        return (
            <Switch>
                <RoleContext.Provider value={isLogged}>
                    <PrivateRoute path='/signin' redirectPath='/members' component={() => <SignIn onClick={this.onClickHandlerSignInResult} />} condition={!isLogged} />
                    <Layout>
                        <Header />
                        <div className={classes.Main}>

                            <PrivateRoute path='/members-tasks' component={MembersTasks} condition={isLogged} />
                            <PrivateRoute path='/members-progress' component={MembersProgress} condition={isLogged} />
                            <PrivateRoute path='/members' component={Members} condition={isLogged} />
                            <PrivateRoute path='/members-tracks' component={MemberTracks} condition={isLogged} />
                            <PrivateRoute path='/tasks' component={Tasks} condition={isLogged} />
                        </div>
                        <Footer />
                    </Layout>
                </RoleContext.Provider>
            </Switch>
        )
    }

}

Main.propTypes = {}
