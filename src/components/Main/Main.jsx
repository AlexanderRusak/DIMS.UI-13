import { PureComponent } from "react";
/* import PropTypes from 'prop-types'; */
import { Switch } from 'react-router-dom';
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
import classes from "./Main.module.css";



export class Main extends PureComponent {

    state = {
        isLogged: true,
    }

    render() {
        const { isLogged } = this.state;


        return (
            <Switch>
                <PrivateRoute path='/signin' component={SignIn} condition={isLogged} />
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
            </Switch>
        )
    }

}

Main.propTypes = {}
