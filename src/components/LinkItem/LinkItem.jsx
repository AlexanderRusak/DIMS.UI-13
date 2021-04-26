import PropTypes from 'prop-types';

export const LinkItem = ({ link, iconComponent }) => {

    return (
        <li>
            <a href={link}>
                {iconComponent}
                {/*  <img className={classes.icon} src={matrix} alt='matrix' /> */}
            </a>
        </li>
    )
}

LinkItem.propTypes = {
    link: PropTypes.string,
    iconComponent: PropTypes.element
};

LinkItem.defaultProps = {
    link: '',
    iconComponent: null
};