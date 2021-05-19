import PropTypes from 'prop-types';
import { generatePath, withRouter } from 'react-router-dom';
import { getActiveButtonStyle } from '../../pages/MembersTasks/MembersTasksHelper';
import { toLowerCaseFirstLetter } from '../Modal/modalHelpers/helpers';
import { getColoredText } from './TableHelpers';
import classes from './TableStyle.module.css';

export const TableBody = ({ items, header, buttons, detailsHeader, detailsComponent }) => {
  const newHeader = header.map((head) => toLowerCaseFirstLetter(head.replace(/\s/g, '')));
  const detailsName = detailsHeader && toLowerCaseFirstLetter(detailsHeader.replace(/\s/g, ''));
  const setColourState = [];
  return (
    items &&
    items.map((item, selectedIndex) => {
      if (item.status !== null) {
        setColourState.push(item.status);
      }

      return (
        <tbody className={classes.TableStyle}>
          <tr className={classes.table}>
            {newHeader.map((header) => {
              return (
                <td
                  key={`${header}-${classes[header] || selectedIndex}`}
                  className={header === '#' ? classes.index : classes[header]}
                >
                  {(item[header] &&
                    (header === 'status' ? (
                      getColoredText(item[header], setColourState[selectedIndex])
                    ) : (
                      <p>
                        {' '}
                        {detailsComponent && header === detailsName
                          ? detailsComponent(item[header], selectedIndex)
                          : item[header]}
                      </p>
                    ))) ||
                    (header === '#' ? (
                      <p>{selectedIndex + 1}</p>
                    ) : (
                      buttons &&
                      buttons.map((button, index) => {
                        const Component = button.component;
                        /*  console.log(button.data[selectedIndex].status); */
                        /* const newButton = button.types.filter((type) => type !== button.data[selectedIndex].status) */
                        /*   console.log(newButton); */
                        return (
                          <Component
                            {...button}
                            pathname={generatePath(button.pathname, {
                              userName: item.fullName,
                            })}
                            styles={
                              button.types
                                ? getActiveButtonStyle(button.data[selectedIndex].status)[index].style
                                : button.styles
                            }
                            title={
                              button.types
                                ? getActiveButtonStyle(button.data[selectedIndex].status)[index].title
                                : button.title
                            }
                            key={`${
                              button.emailId
                                ? button.emailId.email[selectedIndex]
                                : `${header}-${classes[header] || index}`
                            }`}
                            emailId={button.emailId && button.emailId.email[selectedIndex]}
                            onClick={
                              button.onClick &&
                              button.onClick(
                                selectedIndex,
                                button.types && getActiveButtonStyle(button.data[selectedIndex].status)[index].title,
                                button.type && button.type,
                              )
                            }
                          />
                        );
                      })
                    ))}
                </td>
              );
            })}
          </tr>
        </tbody>
      );
    })
  );
};

TableBody.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  header: PropTypes.arrayOf(PropTypes.string).isRequired,
  buttons: PropTypes.arrayOf(PropTypes.shape({})),
  detailsHeaderName: PropTypes.string,
};

TableBody.defaultProps = {
  buttons: null,
  detailsHeader: null,
  detailsComponent: null,
};

withRouter(TableBody);
