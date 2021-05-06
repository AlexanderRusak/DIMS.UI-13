import PropTypes from 'prop-types';
import { toLowerCaseFirstLetter } from '../Modal/modalHelpers/helpers';
import classes from './TableStyle.module.css';

export const TableBody = ({ items, header, buttons, detailsHeader, detailsComponent }) => {
    const newHeader = header.map((head) => toLowerCaseFirstLetter(head.replace(/\s/g, '')));
    const detailsName = detailsHeader && toLowerCaseFirstLetter(detailsHeader.replace(/\s/g, ''))

    return items.map((item, selectedIndex) => {
        return (

            <tbody className={classes.TableStyle}>
                <tr className={classes.table}>
                    {newHeader.map((header) => {
                        return (
                            <td className={header === '#' ? classes.index : classes[header]}>
                                {(item[header] && < p> {detailsComponent && header === detailsName ? detailsComponent(item[header], selectedIndex) : item[header]}</p>
                                ) ||
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
                                    ))
                                }
                            </td>
                        );
                    })}
                </tr>
            </tbody >
        );
    });
};

TableBody.propTypes = {
    items: PropTypes.shape([]).isRequired,
    header: PropTypes.shape([]).isRequired,
    buttons: PropTypes.shape([]),
    detailsHeaderName: PropTypes.string
};

TableBody.defaultProps = {
    buttons: [],
    detailsHeader: null,
    detailsComponent: null,
}

/*

header === detailsHeader && header!=='#'? <detailsComponent.component
                                    {...detailsComponent}
                                    title={item[header]}
                                    onClick={detailsComponent.onClick(selectedIndex, detailsComponent.type)}
                                >
                                    {item[header]}
                                </detailsComponent.component> : */