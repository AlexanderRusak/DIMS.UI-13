import clasees from './TableStyle.module.css';

export const getColoredText = (stateString, state) => {
    switch (state) {
        case 'success':
            return <p className={clasees.success}>{stateString}</p>;
        case 'active':
            return <p className={clasees.active}>{stateString}</p>;
        case 'fail':
            return <p className={clasees.fail}>{stateString}</p>;
        default:
            return <p >{stateString}</p>;
    }
}