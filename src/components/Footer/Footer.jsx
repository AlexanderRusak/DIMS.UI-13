import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import matrix from '../../images/matrix.png';
import classes from './Footer.module.css';

export const Footer = () => {
  return (
    <div className={classes.Footer}>
      <ul className={classes.FotterList}>
        <li>
          <a className={classes.link} href='http://devincubator.by/'>
            <img className={classes.icon} src={matrix} alt='matrix' />
          </a>
        </li>
        <li>
          <a className={classes.link} href='https://github.com/AlexanderRusak'>
            <i>
              <FaGithub size={50} color='#fff' />
            </i>
          </a>
        </li>
        <li>
          <a className={classes.link} href='https://www.linkedin.com/in/alexander-rusak-02646b206/'>
            <i>
              <FaLinkedin size={50} color='#fff' />
            </i>
          </a>
        </li>
        <li>
          <a className={classes.link} href='https://www.instagram.com/rusak_alexander/'>
            <i>
              <FaInstagram size={50} color='#fff' />
            </i>
          </a>
        </li>
      </ul>
    </div>
  );
};
