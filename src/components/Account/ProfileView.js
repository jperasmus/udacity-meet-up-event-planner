import React, {
  PropTypes,
  Component
} from 'react';
import { createUserDBObject } from '../../helpers';
import base from '../../base';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import MobileTearSheet from '../MobileTearSheet';
import EventsList from '../EventsList';
import { Grid, Row, Col } from 'react-flexbox-grid';
import profileStyles from './profile.scss';

const GUTTER = 16;
const styles = {
  mainHeader: {
    textAlign: 'center',
    marginTop: 0
  },
  icon: {
    fontSize: 12,
    lineHeight: 1.1
  },
  button: {
    margin: 10
  },
  avatarWrap: {
    textAlign: 'center',
    padding: GUTTER
  },
  wrapperDiv: {
    textAlign: 'center',
    marginTop: 2 * GUTTER
  },
  avatar: {
    width: '100%',
    maxWidth: 140
  }
};

class ProfileView extends Component {
  constructor(props, context) {
    super(props, context);
    
    this.initUser = this.initUser.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.onEditProfileClick = this.onEditProfileClick.bind(this);
    this.enableEditButton = this.enableEditButton.bind(this);
    this.disableEditButton = this.disableEditButton.bind(this);
    
    base.onAuth(() => this.initUser());
    
    this.state = {
      canEdit: false,
      user: null,
      events: null,   // All events
      tabIndex: 0
    };
  }
  
  componentWillMount() {
    this.eventsRef = base.syncState(`events`, {
      context: this,
      state: 'events'
    });
  }
  
  componentWillUnmount() {
    base.removeBinding(this.userRef);
    base.removeBinding(this.eventsRef);
  }
  
  initUser() {
    console.log('initUser', base.getAuth());
    const userRef = base.getAuth() && base.getAuth().uid || false;

    if (userRef) {
      this.userRef = base.bindToState(`users/${userRef}`, {
        context: this,
        state: 'user'
      });
      this.enableEditButton();
    } else {
      // User is not logged in, redirect to login page
      this.context.router.transitionTo('/login');
    }
  }
  
  handleTabChange(value) {
    this.setState({ tabIndex: value });
  }
  
  enableEditButton() {
    this.setState({ canEdit: true });
  }
  
  disableEditButton() {
    this.setState({ canEdit: false });
  }
  
  onEditProfileClick(e) {
    e.preventDefault();
    this.disableEditButton();
    this.context.router.transitionTo('/profile/edit');
  }
  
  render() {
    if (this.state && this.state.user) {
      // The user exists, but has an empty structure, let's create a starting point
      // This should happen very seldom and mostly when I manually mess with the users in the firebase console
      // or they were created before the user structure was implemented
      if (Object.keys(this.state.user).length === 0) {
        createUserDBObject(base.getAuth());
      }

      const {
        uid,
        email,
        displayName,
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
      
      const allEvents = this.state.events || {};
      let hostedEvents = eventsHosted || {};
      hostedEvents = Object
        .keys(hostedEvents)
        .map(slug => allEvents[slug]);
      let attendedEvents = eventsAttended || {};
      attendedEvents = Object
        .keys(attendedEvents)
        .map(slug => allEvents[slug]);
      
      return (
        <Grid>
          <Row>
            <Col xs={12}>
              <Paper className={profileStyles.paperContainer} zDepth={1} rounded={false}>
                <h1 style={styles.mainHeader}>Profile</h1>
                <Divider style={{ marginBottom: GUTTER }} />
                <Row>
                  <Col xs={12} sm={3}>
                    <MobileTearSheet>
                      <Subheader>Details</Subheader>
                      <Divider/>
                      <div style={styles.avatarWrap}>
                        <Avatar
                          src={`https://api.adorable.io/avatars/180/${uid || 'rendezvous'}.png`}
                          size={140}
                          style={styles.avatar}
                        />
                      </div>
                      <List>
                        <ListItem disabled={true} primaryText={`${displayName}`} leftIcon={<FontIcon className="material-icons">face</FontIcon>} />
                        <ListItem disabled={true} primaryText={`${email}`} leftIcon={<FontIcon className="material-icons">email</FontIcon>} />
                        <ListItem disabled={true} primaryText={`${employer}`} leftIcon={<FontIcon className="material-icons">work</FontIcon>} />
                        <ListItem disabled={true} primaryText={`${website}`} leftIcon={<FontIcon className="material-icons">language</FontIcon>} />
                        <ListItem disabled={true} primaryText={`${birthday}`} leftIcon={<FontIcon className="material-icons">card_giftcard</FontIcon>} />
                      </List>
                    </MobileTearSheet>
                  </Col>
                  <Col xs={12} sm={9}>
                    <h3 style={{ marginTop: 0 }}>Events</h3>
                    <Tabs
                      onChange={this.handleTabChange}
                      value={this.state.tabIndex}
                    >
                      <Tab
                        value={0}
                        icon={<FontIcon className="material-icons">event</FontIcon>}
                        label="I Organised"
                      />
                      <Tab
                        value={1}
                        icon={<FontIcon className="material-icons">event_seat</FontIcon>}
                        label="I Attended"
                      />
                    </Tabs>
                    <SwipeableViews
                      index={this.state.tabIndex}
                      onChangeIndex={this.handleTabChange}
                    >
                      <div className={profileStyles.tabContent}>
                        {
                          hostedEvents.length
                            ? <EventsList events={hostedEvents} showFilter={false} />
                            : <p style={{ textAlign: 'center' }}>You have not hosted any events yet.</p>
                        }
                      </div>
                      <div className={profileStyles.tabContent}>
                        {
                          attendedEvents.length
                            ? <EventsList events={attendedEvents} showFilter={false} />
                            : <p style={{ textAlign: 'center' }}>You have not attended any events yet.</p>
                        }
                      </div>
                    </SwipeableViews>
                  </Col>
                </Row>
                <Divider />
                <div style={styles.wrapperDiv}>
                  <h3 className="specialFont">See something you want to change?</h3>
                  <RaisedButton
                    primary={true}
                    style={styles.button}
                    label="Edit Profile"
                    icon={<FontIcon className="material-icons" style={styles.icon}>mode_edit</FontIcon>}
                    onTouchTap={this.onEditProfileClick}
                    disabled={!this.state.canEdit}
                  />
                </div>
              </Paper>
            </Col>
          </Row>
        </Grid>
      );
    }
    
    return (
      <div style={styles.wrapperDiv}>
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
