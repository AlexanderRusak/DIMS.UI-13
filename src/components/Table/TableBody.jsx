import PropTypes from 'prop-types';
import classes from './TableStyle.module.css';

export const TableBody = ({ items, header }) => {
    const newHeader = header.map(head => head.replace(/\s/g, ''));

    return items.map((item) => {
        return (<div className={classes.TableStyle}>
            <ul className={classes.table}>
                {newHeader.map((header, index) => {
                    console.log(item[header])
                    return (<li>
                        <p>{item[header] || index + 1}</p>
                    </li>)
                })}
            </ul>
        </div>)
    })
}

TableBody.propTypes = {
    items: PropTypes.shape([]).isRequired,
    header: PropTypes.shape([]).isRequired,
};

/* {Object.values(item).map((i, index) => i[header[index]]).map(item => {
    console.log(item);
    return <li>
        <p>{item}</p>
    </li>
})} */