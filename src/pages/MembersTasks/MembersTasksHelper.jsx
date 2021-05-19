import classes from '../TableStyle.module.css';

export const getActiveButtonStyle = (status) => {
  const styles = [
    { style: `  ${classes.danger}`, title: 'fail' },
    { style: `  ${classes.button}`, title: 'success' },
    { style: `  ${classes.default}`, title: 'active' },
  ];

  return styles.filter((style) => style.title !== status);
};
