import PropTypes from 'prop-types';
import classes from './TableStyle.module.css';

export const TableHeader = ({ items }) => {
  return (<thead className={classes.TableStyle}>
    <tr className={classes.header}>
      {items.map(item =>
        <td key={item}>
          <p>{item}</p>
        </td>
      )}
    </tr>
  </thead>)
}

TableHeader.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
