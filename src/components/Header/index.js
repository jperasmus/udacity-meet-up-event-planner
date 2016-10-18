import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Login from './Login';
import Logged from './Logged';
import './index.css';

class Header extends Component {
  constructor(props, context) {
    super(props, context);
    
    this.handleTitleTouch = this.handleTitleTouch.bind(this);

    this.state = {
      logged: true
    };
  }
  
  handleTitleTouch() {
    this.context.router.transitionTo('/');
  };
  
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
        iconElementRight={this.state.logged ? <Logged /> : <Login />}
      />
    );
  }
}

Header.contextTypes = {
  router: React.PropTypes.object
};

export default Header;
