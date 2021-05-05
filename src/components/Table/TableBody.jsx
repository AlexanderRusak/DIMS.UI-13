import PropTypes from 'prop-types';
import { toLowerCaseFirstLetter } from '../Modal/modalHelpers/helpers';
import classes from './TableStyle.module.css';

export const TableBody = ({ items, header, buttons = [] }) => {
    const newHeader = header.map((head) => toLowerCaseFirstLetter(head.replace(/\s/g, '')));
    console.log(items, newHeader);

    return items.map((item, selectedIndex) => {
        return (
            <tbody className={classes.TableStyle}>
                <tr className={classes.table}>
                    {newHeader.map((header) => {
                        return (
                            <td className={header === '#' ? classes.index : classes[header]}>
                                {(item[header] && <p>{item[header]}</p>) ||
                                    (header === '#' ? (
                                        <p>{selectedIndex + 1}</p>
                                    ) : (
                                        buttons.map((button) => (
                                            <button.component
                                                {...button}
                                                emailId={button.emailId && button.emailId.email[selectedIndex]}
                                                onClick={button.onClick && button.onClick(selectedIndex, button.type && button.type)}
                                            />
                                        ))
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
    items: PropTypes.shape([]).isRequired,
    header: PropTypes.shape([]).isRequired,
    buttons: PropTypes.shape([]).isRequired,
};



