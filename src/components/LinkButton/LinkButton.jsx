import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import noop from '../../shared/noop';

export const LinkButton = ({ pathname: p, emailId: e, styles, title }) => {
  console.log(p, e, styles, title, 'LinkButton');
  return (
    <NavLink
      to={{
        pathname: p,
        emailId: e,
      }}
    >
      <ButtonGroup styles={`${styles} `} title={title} onClick={noop} />
    </NavLink>
  );
};

LinkButton.propTypes = {
  pathname: PropTypes.string.isRequired,
  emailId: PropTypes.string.isRequired,
  styles: PropTypes.string.isRequired,
  title: PropTypes.string,
};
LinkButton.defaultProps = {
  title: 'Link',
};
