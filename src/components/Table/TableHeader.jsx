import PropTypes from 'prop-types';
import classes from './TableStyle.module.css';

export const TableHeader = ({ items }) => {
  return (
    <thead className={classes.TableStyle}>
      <tr className={classes.header}>
        {items.map((item) => (
          <td>
            <p>{item}</p>
          </td>
        ))}

        {/*             <li className={classes.date}>
                <p>Date</p>
            </li> */}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  items: PropTypes.shape([]).isRequired,
};
