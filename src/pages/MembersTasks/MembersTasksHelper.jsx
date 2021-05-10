import classes from '../TableStyle.module.css';



export const getActiveButtonStyle = (status) => {
    switch (status) {
        case 'active':
            return [` ${classes.button} ${classes.danger}`, ` ${classes.button}`]
        case 'fail':
            return [` ${classes.button} ${classes.default}`, `${classes.button}`]
        case 'success':
            return [` ${classes.button} ${classes.danger}`, ` ${classes.button} ${classes.default}`]
        default:
            return []
    }
}