import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Members from '../pages/Members';
import MembersTasks from '../pages/Members/MembersTasks';
import MembersProgress from '../pages/Members/MembersProgress';
import { Tasks } from '../pages/Tasks/Tasks';
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
    <Layout>
      <Header />
      <div className={classes.App}>
        <Switch>
          <Route path='/members-tasks' component={MembersTasks} />
          <Route path='/members-progress' component={MembersProgress} />
          <Route path='/members' component={Members} />
          <Route path='/tasks' component={Tasks} />
        </Switch>
      </div>
      <Footer />
    </Layout>
  );
};
