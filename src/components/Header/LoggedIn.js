import React, {
  Component,
  PropTypes
} from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FontIcon from 'material-ui/FontIcon';

class Logged extends Component {
  static muiName = 'IconMenu';
  
  browseTo(link) {
    this.context.router.transitionTo(link);
  }

  render() {
    return (
      <IconMenu
        {...this.props}
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem
          primaryText="Create Event"
          rightIcon={<FontIcon className="material-icons">event</FontIcon>}
          onTouchTap={() => this.browseTo('/new-event')}
        />
        <MenuItem
          primaryText="My Profile"
          rightIcon={<FontIcon className="material-icons">face</FontIcon>}
          onTouchTap={() => this.browseTo('/profile')}
        />
        <MenuItem
          primaryText="Log out"
          rightIcon={<FontIcon className="material-icons">lock_open</FontIcon>}
          onTouchTap={this.props.onLogoutClick}
        />
      </IconMenu>
    );
  }
}

Logged.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Logged;
