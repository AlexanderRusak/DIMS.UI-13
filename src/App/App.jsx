import { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Members from '../pages/Members/Members';
import MembersTasks from '../pages/Members/MembersTasks';
import MemberTracks from '../pages/Members/MemberTracks';
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
    <BrowserRouter>
      <Switch>
        <Route path='/signin' component={SignIn} />
        <Layout>
          <Header />

          <div className={classes.App}>
            <Route path='/members-tasks' component={MembersTasks} />
            <Route path='/members-progress' component={MembersProgress} />
            <Route path='/members' component={Members} />
            <Route path='/members-tracks' component={MemberTracks} />
            <Route path='/tasks' component={Tasks} />
          </div>
          <Footer />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
};
