import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import LoggedOut from './LoggedOut';
import LoggedIn from './LoggedIn';
import base from '../../base';

class Header extends Component {
  constructor(props, context) {
    super(props, context);
    
    this.handleTitleTouch = this.handleTitleTouch.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.authHandler = this.authHandler.bind(this);

    this.state = {
      logged: false
    };

    base.onAuth((user) => {
      this.setState({ logged: !!user });
    });
  }

  handleTitleTouch() {
    this.context.router.transitionTo('/');
  };

  authHandler(error, user) {
    if (error) {
      console.error('Error occurred when authenticated user', error);
    }
    // Nothing to do here, because handling login/logout state in `onAuth` listener
  }
  
  onLoginClick() {
    // Simple email/password authentication spoof
    base.authWithPassword({
      email: 'jperasmus11@gmail.com',
      password: 'helloyou'
    }, this.authHandler);
  }

  onLogoutClick() {
    base.unauth();
  }

  render() {
    const styles = {
      title: {
        cursor: 'pointer',
      },
    };

    return (
      <AppBar
        title={<span style={styles.title}>Rendezvous</span>}
        onTitleTouchTap={this.handleTitleTouch}
        showMenuIconButton={false}
        iconElementRight={this.state.logged ? <LoggedIn onLogoutClick={this.onLogoutClick} /> : <LoggedOut onLoginClick={this.onLoginClick} />}
      />
    );
  }
}

Header.contextTypes = {
  router: React.PropTypes.object
};

export default Header;
