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
  
  componentDidMount() {
    this.initUser();
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
    }
  }
  
  render() {
    const wrapperDivStyles = { textAlign: 'center', marginTop: '30px' };
    
    if (this.state && this.state.user) {
      console.log('state', this.state.user);
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
        uid, name, description, email, status,
        otherLinks, startDate, endDate,
        host, location, type, owner, capacity,
        confirmCount, speakers, guests, files
      } = this.state.user;
      
      const hostLink = host && host.link && host.name ? <a href={host.link} target="_blank">{host.name}</a> : host.name;
      const hostedBy = hostLink ? <span style={styles.hostedBy}>hosted by: {hostLink}</span> : '';
      
      return (
        <Grid>
          <Paper style={styles.paper} zDepth={1} rounded={false}>
            <h1 style={{ textAlign: 'center' }}>{name}</h1>
            {hostedBy}
            <Divider style={{ marginBottom: 20 }} />
            <Row>
              <Col xs={12} sm={3}>
                <MobileTearSheet>
                  <Subheader>My Details</Subheader>
                  <Divider/>
                  <List>
                    <ListItem disabled={true} primaryText={`${startDate} - ${endDate}`} leftIcon={<FontIcon className="material-icons">date_range</FontIcon>} />
                    <ListItem disabled={true} primaryText={`${location || 'Location not set'}`} leftIcon={<FontIcon className="material-icons">room</FontIcon>} />
                    <ListItem disabled={true} primaryText={`${type}`} leftIcon={<FontIcon className="material-icons">receipt</FontIcon>} />
                    <ListItem disabled={true} primaryText={`${owner}`} leftIcon={<FontIcon className="material-icons">face</FontIcon>} />
                    <ListItem disabled={true} primaryText={`${confirmCount || 0}/${capacity || '?'} spots`} leftIcon={<FontIcon className="material-icons">group</FontIcon>} />
                  </List>
                </MobileTearSheet>
              </Col>
              <Col xs={12} sm={9}>
                {description}
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
ProfileView.defaultProps = {};

export default ProfileView;
