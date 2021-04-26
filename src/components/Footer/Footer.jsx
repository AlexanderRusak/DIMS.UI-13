import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { BsEgg } from 'react-icons/bs';
import { LinkItem } from '../LinkItem/LinkItem';
import { FeedbackLinks } from '../../feedbackLinks'
import { COLORS, FONTS_SIZE } from '../StylesConstant/colors';
import classes from '../StylesConstant/mainStyle.module.css';


export const Footer = () => {

  const { devIncubator, gitHub, linkedIn, instagram } = FeedbackLinks;


  return (
    <div className={classes.Main}>
      <ul className={classes.FooterList}>
        <LinkItem link={devIncubator}
          iconComponent={<BsEgg size={FONTS_SIZE.ICON_FOOTER} color={COLORS.WHITE} />}
        />
        <LinkItem link={gitHub}
          iconComponent={<FaGithub size={FONTS_SIZE.ICON_FOOTER} color={COLORS.WHITE} />}
        />
        <LinkItem link={linkedIn}
          iconComponent={<FaLinkedin size={FONTS_SIZE.ICON_FOOTER} color={COLORS.WHITE} />}
        />
        <LinkItem link={instagram}
          iconComponent={<FaInstagram size={FONTS_SIZE.ICON_FOOTER} color={COLORS.WHITE} />}
        />
      </ul>
    </div>
  );
};
