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

class Event extends Component {
  componentDidMount() {
    // query the firebase database once for the data
    this.eventRef = base.bindToState(`events/${this.props.params.eventId}`, {
      context: this,
      state: 'event'
    })
  }
  
  componentWillUnmount() {
    base.removeBinding(this.eventRef);
  }
  
  render() {
    const wrapperDivStyles = { textAlign: 'center', marginTop: '30px' };
    
    if (this.state && this.state.event) {
      if (Object.keys(this.state.event).length === 0) {
        return (
          <div style={wrapperDivStyles}>
            <h1>Sorry, that event is gone...</h1>
            <Link to="/">
              <ActionFlightTakeoff style={{ height: '60px', width: '60px' }} />
            </Link>
          </div>
        );
      }
      
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
        name, description, openEvent, status,
        otherLinks, startDate, endDate,
        host, location, type, owner, capacity,
        confirmCount, speakers, guests, files
      } = this.state.event;
      
      const speakersListItems = Object.keys(speakers)
        .map((name, index) => {
          const { name: speaker, topic, link } = Object.assign(speakers[name], { name });
          const topicAndSpeaker = topic ? `${speaker} on "${topic}"` : speaker;
          return (
            <ListItem key={index} disabled={true}>
              {link ? <a href={link} target="_blank">{topicAndSpeaker}</a> : topicAndSpeaker}
            </ListItem>
          );
        });
  
      const hostLink = host.link && host.name ? <a href={host.link} target="_blank">{host.name}</a> : host.name;
      const hostedBy = hostLink ? <span style={styles.hostedBy}>hosted by: {hostLink}</span> : '';
      
      return (
        <Grid>
          <Paper style={styles.paper} zDepth={1} rounded={false}>
            <h1 style={{ textAlign: 'center' }}>{name}</h1>
            {hostedBy}
            <Divider style={{ marginBottom: 20 }} />
            <Row>
              <Col xs={12} sm={4} md={3}>
                <MobileTearSheet>
                  <Subheader>The Details</Subheader>
                  <Divider/>
                  <List>
                    <ListItem disabled={true} primaryText={`${startDate} - ${endDate}`} leftIcon={<FontIcon className="material-icons">date_range</FontIcon>} />
                    <ListItem disabled={true} primaryText={`${location || 'Location not set'}`} leftIcon={<FontIcon className="material-icons">room</FontIcon>} />
                    <ListItem disabled={true} primaryText={`${type}`} leftIcon={<FontIcon className="material-icons">receipt</FontIcon>} />
                    <ListItem disabled={true} primaryText={`${owner}`} leftIcon={<FontIcon className="material-icons">face</FontIcon>} />
                    <ListItem disabled={true} primaryText={`${confirmCount || 0}/${capacity || '?'} spots`} leftIcon={<FontIcon className="material-icons">group</FontIcon>} />
                    <ListItem
                      primaryText="Speakers"
                      leftIcon={<FontIcon className="material-icons">record_voice_over</FontIcon>}
                      initiallyOpen={false}
                      disabled={true}
                      primaryTogglesNestedList={true}
                      nestedItems={speakersListItems}
                    />
                  </List>
                </MobileTearSheet>
              </Col>
              <Col xs={12} sm={8} md={9}>
                {description}
                {/* TODO: Add component for RSVP's/Guest list */}
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

Event.propTypes = {
  params: PropTypes.object.isRequired
};
Event.defaultProps = {};

export default Event;
