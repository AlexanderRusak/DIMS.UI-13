import PropTypes from 'prop-types';
import { toLowerCaseFirstLetter } from '../Modal/modalHelpers/helpers';
import classes from './TableStyle.module.css';

export const TableBody = ({ items, header, buttons, detailsHeader, detailsComponent }) => {
  const newHeader = header.map((head) => toLowerCaseFirstLetter(head.replace(/\s/g, '')));
  const detailsName = detailsHeader && toLowerCaseFirstLetter(detailsHeader.replace(/\s/g, ''));

  return items.map((item, selectedIndex) => {
    return (
      <tbody className={classes.TableStyle}>
        <tr className={classes.table}>
          {newHeader.map((header) => {
            return (
              <td key={header} className={header === '#' ? classes.index : classes[header]}>
                {(item[header] && (
                  <p>
                    {' '}
                    {detailsComponent && header === detailsName
                      ? detailsComponent(item[header], selectedIndex)
                      : item[header]}
                  </p>
                )) ||
                  (header === '#' ? (
                    <p>{selectedIndex + 1}</p>
                  ) : (
                    buttons.map((button) => {
                      console.log(`${button.title}-${item.email}`);
                      return (
                        <button.component
                          {...button}
                          key={`${button.emailId && button.emailId.email[selectedIndex]} ${button.title}`}
                          emailId={button.emailId && button.emailId.email[selectedIndex]}
                          onClick={button.onClick && button.onClick(selectedIndex, button.type && button.type)}
                        />
                      )
                    })
                  ))}
              </td>
            );
          })}
        </tr>
      </tbody>
    );
  });
};

TableBody.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  header: PropTypes.arrayOf(PropTypes.string).isRequired,
  buttons: PropTypes.arrayOf(PropTypes.shape({})),
  detailsHeaderName: PropTypes.string,
};

TableBody.defaultProps = {
  buttons: {},
  detailsHeader: null,
  detailsComponent: null,
};


