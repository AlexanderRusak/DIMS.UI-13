import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Main } from '../components/Main/Main';




import { appTitle } from '../config';
import classes from './App.module.css';

export const App = () => {
  useEffect(() => {
    document.title = appTitle;
  }, []);


  return (
    <BrowserRouter>
      <Main style={classes} />
    </BrowserRouter>
  );
};
