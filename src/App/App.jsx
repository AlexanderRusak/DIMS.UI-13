import { useEffect } from 'react';
import { Members } from '../pages/Members';
import { appTitle } from '../config';
import classes from './App.module.css';

export const App = () => {
  useEffect(() => {
    document.title = appTitle;
  }, []);

  return (
    <div className={classes.App}>
      <Members />
    </div>
  );
};
