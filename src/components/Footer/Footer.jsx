import { Icon } from '../UI/Icon/Icon'
import { FeedbackLinks } from '../../feedbackLinks'
import classes from '../StylesConstant/mainStyle.module.css';


export const Footer = () => {

  return (
    <div className={classes.Main}>
      <ul className={classes.FooterList}>
        {Object.values(FeedbackLinks).map((item) => <Icon link={item.link} IconComponent={item.logo} key={item.link} />
        )}
      </ul>
    </div>
  );
};
