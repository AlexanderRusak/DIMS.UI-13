import PropTypes from 'prop-types';
import classes from './TableStyle.module.css';

export const TableHeader = ({ items }) => {
    return (<div className={classes.TableStyle}>
        <ul className={classes.header}>
            {items.map(item =>
                <li>
                    <p>{item}</p>
                </li>
            )}

            {/*             <li className={classes.date}>
                <p>Date</p>
            </li> */}
        </ul>
    </div>)
}

TableHeader.propTypes = {
    items: PropTypes.shape([]).isRequired,
};
