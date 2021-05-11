import classes from '../TableStyle.module.css';



/* export const getActiveButtonStyle = (status) => {
    console.log(status);
    switch (status) {

        case 'active':
            return [`  ${classes.danger}`, ` ${classes.button}`]
        case 'fail':
            return [`  ${classes.default}`, `${classes.button}`]
        case 'success':
            return [`  ${classes.danger}`, `  ${classes.default}`]
        default:
            return []
    }
} */



export const getActiveButtonStyle = (status) => {
    console.log(status);
    switch (status) {

        case 'active':
            return [{ style: `  ${classes.danger}`, title: 'Fail' },
            { style: `  ${classes.button}`, title: 'Success' }]
        case 'fail':
            return [{ style: `  ${classes.default}`, title: 'Active' },
            { style: `  ${classes.button}`, title: 'Success' }]
        case 'success':
            return [{ style: `  ${classes.danger}`, title: 'Fail' },
            { style: `  ${classes.default}`, title: 'Active' }]
        default:
            return []
    }
}