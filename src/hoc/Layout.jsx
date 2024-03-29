import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Drawer } from '../components/Navigation/Drawer/Drawer';
import MenuToggle from '../components/Navigation/MenuToggle/MenuToggle';
import noop from '../shared/noop';
import classes from './Layout.module.css';

export default class Layout extends PureComponent {
  state = {
    menu: false,
  };

  toggleMenuHandler = () => {
    const { menu } = this.state;
    this.setState({
      menu: !menu,
    });
  };

  menuCloseHandler = () => {
    this.setState({ menu: false });
  };

  render() {
    const { menu } = this.state;
    const { children } = this.props;

    return (
      <div>
        <Drawer isOpen={menu} onClose={this.menuCloseHandler} onKeyPress={noop} onChose={null} />
        <MenuToggle onToggle={this.toggleMenuHandler} isOpen={menu} onKeyPress={noop} />
        <main className={classes.center}>{children}</main>
      </div>
    );
  }
}
Layout.propTypes = {
  children: PropTypes.shape({
    children: PropTypes.elementType,
  }).isRequired,
};
