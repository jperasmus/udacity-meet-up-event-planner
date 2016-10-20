import React, {
  PropTypes,
  Component
} from 'react';
import { Link } from 'react-router';
import base from '../../base';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import MobileTearSheet from '../MobileTearSheet';
import { Grid, Row, Col } from 'react-flexbox-grid';

class ProfileView extends Component {
  constructor(props, context) {
    super(props, context);
    
    this.initUser = this.initUser.bind(this);
    
    base.onAuth(() => this.initUser());
    
    this.state = {
      user: null
    };
  }

  componentWillUnmount() {
    base.removeBinding(this.userRef);
  }
  
  initUser() {
    console.log('initUser', base.getAuth());
    const userRef = base.getAuth() && base.getAuth().uid || false;

    if (userRef) {
      this.userRef = base.bindToState(`users/${userRef}`, {
        context: this,
        state: 'user'
      });
    } else {
      // User is not logged in, redirect to login page
      this.context.router.transitionTo('/login');
    }
  }
  
  render() {
    const wrapperDivStyles = { textAlign: 'center', marginTop: '30px' };
    
    if (this.state && this.state.user) {
      const styles = {
        paper: {
          width: '100%',
          margin: 15,
          padding: 20
        },
        icon: {
          fontSize: 12,
          lineHeight: 1.1
        },
        button: {
          margin: 10
        },
        hostedBy: {
          textAlign: 'center',
          display: 'block',
          marginBottom: 15,
          fontSize: 12
        }
      };
      
      const {
        uid,
        email,
        displayName,
        firstName,
        lastName,
        employer,
        website,
        birthday,
        facebook,
        github,
        twitter,
        instagram,
        eventsHosted,
        eventsAttended,
      } = this.state.user;
      
      return (
        <Grid>
          <Paper style={styles.paper} zDepth={1} rounded={false}>
            <h1 style={{ textAlign: 'center' }}>Profile</h1>
            <Divider style={{ marginBottom: 20 }} />
            <Row>
              <Col xs={12} sm={3}>
                <MobileTearSheet>
                  <Subheader>Details</Subheader>
                  <Divider/>
                  <div style={{ textAlign: 'center', padding: 15 }}>
                    <Avatar
                      src={`https://api.adorable.io/avatars/180/${uid || 'rendezvous'}.png`}
                      size={140}
                      style={{ borderRadius: 0, width: '100%', maxWidth: 140 }}
                    />
                  </div>
                  <List>
                    <ListItem disabled={true} primaryText={`${email}`} leftIcon={<FontIcon className="material-icons">face</FontIcon>} />
                  </List>
                </MobileTearSheet>
              </Col>
              <Col xs={12} sm={9}>
              </Col>
            </Row>
            <Divider />
            <div style={wrapperDivStyles}>
              <h3 className="specialFont">Are you going?</h3>
              <RaisedButton primary={true} style={styles.button} label="Count me in!" icon={<FontIcon className="material-icons" style={styles.icon}>done</FontIcon>} />
              <RaisedButton default={true} style={styles.button} label="Nope." icon={<FontIcon className="material-icons" style={styles.icon}>clear</FontIcon>} />
              <RaisedButton secondary={true} style={styles.button} label="Remind me later" icon={<FontIcon className="material-icons" style={styles.icon}>schedule</FontIcon>} />
            </div>
          </Paper>
        </Grid>
      );
    }
    
    return (
      <div style={wrapperDivStyles}>
        <CircularProgress size={80} thickness={5} />
      </div>
    );
  }
  
}

ProfileView.propTypes = {
  params: PropTypes.object.isRequired
};
ProfileView.contextTypes = {
  router: PropTypes.object
};

export default ProfileView;
