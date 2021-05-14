import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import noop from '../../shared/noop';

export const LinkButton = ({ pathname, emailId, styles, title }) => (
  <Link
    to={{
      pathname,
      emailId,
    }}
  >
    <ButtonGroup styles={`${styles} `} title={title} onClick={noop} />
  </Link>
);

LinkButton.propTypes = {
  pathname: PropTypes.string.isRequired,
  emailId: PropTypes.string.isRequired,
  styles: PropTypes.node.isRequired,
  title: PropTypes.string,
};
LinkButton.defaultProps = {
  title: 'Link',
};
