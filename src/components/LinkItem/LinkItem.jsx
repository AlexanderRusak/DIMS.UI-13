import PropTypes from 'prop-types';

export const LinkItem = ({ link, iconComponent }) => {
  return (
    <li>
      <a href={link}>{iconComponent}</a>
    </li>
  );
};

LinkItem.propTypes = {
  link: PropTypes.string,
  iconComponent: PropTypes.instanceOf(PropTypes.elementType),
};

LinkItem.defaultProps = {
  link: '',
  iconComponent: '',
};
