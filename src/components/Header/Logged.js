import React, {
  Component,
  PropTypes,
} from 'react';
import { Link } from 'react-router';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Logged extends Component {
  static muiName = 'IconMenu';
  
  render() {
    return (
      <IconMenu
        {...this.props}
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <Link to="/new-event"><MenuItem primaryText="Create Event" /></Link>
        <Link to="/profile"><MenuItem primaryText="My Profile" /></Link>
        <Link to="/logout"><MenuItem primaryText="Sign out" /></Link>
      </IconMenu>
    );
  }
}

Logged.propTypes = {};
Logged.defaultProps = {};

export default Logged;
