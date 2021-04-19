import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Members from '../pages/Members';
import MembersTasks from '../pages/Members/MembersTasks';
import MembersProgress from '../pages/Members/MembersProgress';
import Layout from '../hoc/Layout';
import { appTitle } from '../config';
import classes from './App.module.css';

export const App = () => {
  useEffect(() => {
    document.title = appTitle;
  }, []);

  return (
    <Layout>
      <div className={classes.App}>
        <Switch>
          <Route path='/members-tasks' component={MembersTasks} />
          <Route path='/members-progress' component={MembersProgress} />
          <Route path='/members' component={Members} />
        </Switch>
      </div>
    </Layout>
  );
};
