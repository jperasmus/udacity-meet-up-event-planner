import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Snackbar from 'material-ui/Snackbar';
import Login from './Login';
import Logged from './Logged';
import base from '../../base';

class Header extends Component {
  constructor(props, context) {
    super(props, context);
    
    this.handleTitleTouch = this.handleTitleTouch.bind(this);
    this.logout = this.logout.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.authHandler = this.authHandler.bind(this);

    this.state = {
      logged: false
    };
  }
  
  handleTitleTouch() {
    this.context.router.transitionTo('/');
  };
  
  logout() {
    console.log('logout', base);
    base.unauth();
    this.setState({ logged: false });
  }
  
  authHandler(error, user) {
    if (error) {
      console.error('error', error);
    }
    console.info('user logged in', user);
    window.localStorage.setItem('rendezvous-user', user.uid);
    this.setState({ logged: true });
  }
  
  onLoginClick() {
    // Simple email/password authentication
    base.authWithPassword({
      email: 'jperasmus11@gmail.com',
      password: 'helloyou'
    }, this.authHandler);
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
        iconElementRight={this.state.logged ? <Logged onLogoutClick={this.logout} /> : <Login onLoginClick={this.onLoginClick} />}
      />
    );
  }
}

Header.contextTypes = {
  router: React.PropTypes.object
};

export default Header;
