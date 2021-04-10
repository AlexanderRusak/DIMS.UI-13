import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Members from '../pages/Members';
import MembersTasks from '../pages/Members/MembersTasks';
import MembersProgress from '../pages/Members/MembersProgress';
import { Tasks } from '../pages/Tasks/Tasks';
import { SignIn } from '../pages/SignIn/SignIn';
import Layout from '../hoc/Layout';
import { appTitle } from '../config';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import classes from './App.module.css';

export const App = () => {
  useEffect(() => {
    document.title = appTitle;
  }, []);

  return (
    <Switch>
      <Route path='/signin' component={SignIn} />
      <Layout>
        <Header />
        <div className={classes.App}>
          <Route path='/members-tasks' component={MembersTasks} />
          <Route path='/members-progress' component={MembersProgress} />
          <Route path='/members' component={Members} />
          <Route path='/tasks' component={Tasks} />
        </div>
        <Footer />
      </Layout>
    </Switch>
  );
};
