import PropTypes from 'prop-types';
import { LinkItem } from '../../LinkItem/LinkItem';
import { FONTS_SIZE, COLORS } from '../../StylesConstant/colors';

export const Icon = ({ IconComponent, link }) => <LinkItem link={link}
    iconComponent={<IconComponent size={FONTS_SIZE.ICON_FOOTER} color={COLORS.WHITE} />}
/>



Icon.propTypes = {
    IconComponent: PropTypes.node.isRequired,
    link: PropTypes.string.isRequired
}