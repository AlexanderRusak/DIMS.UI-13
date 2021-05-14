import PropTypes from 'prop-types';
import { getActiveButtonStyle } from '../../pages/MembersTasks/MembersTasksHelper';
import { toLowerCaseFirstLetter } from '../Modal/modalHelpers/helpers';
import { getColoredText } from './TableHelpers';
import classes from './TableStyle.module.css';

export const TableBody = ({ items, header, buttons, detailsHeader, detailsComponent }) => {
  const newHeader = header.map((head) => toLowerCaseFirstLetter(head.replace(/\s/g, '')));
  const detailsName = detailsHeader && toLowerCaseFirstLetter(detailsHeader.replace(/\s/g, ''));
  const setColourState = [];


  return items.map((item, selectedIndex) => {

    if (item.state !== null) {
      setColourState.push(item.state)
    }

    return (
      <tbody className={classes.TableStyle}>
        <tr className={classes.table}>
          {newHeader.map((header) => {

            return (
              <td key={header} className={header === '#' ? classes.index : classes[header]}>
                {(item[header] && (
                  header === 'state' ? getColoredText(item[header], setColourState[selectedIndex]) :
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
                    buttons.map((button, index) => {

                      return (
                        <button.component
                          {...button}
                          styles={button.types ? getActiveButtonStyle(button.data[selectedIndex].state)[index].style : button.styles}
                          title={button.types ? getActiveButtonStyle(button.data[selectedIndex].state)[index].title : button.title}
                          key={`${button.emailId && button.emailId.email[selectedIndex]} ${button.title}`}
                          emailId={button.emailId && button.emailId.email[selectedIndex]}
                          onClick={button.onClick && button.onClick(selectedIndex, button.type && button.type, button.types && button.types.filter(type => type !== button.data[selectedIndex].state)[index])}
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

