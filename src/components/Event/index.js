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
import MobileTearSheet from '../MobileTearSheet';
import { Grid, Row, Col } from 'react-flexbox-grid';

class Event extends Component {
  componentWillMount() {
    // query the firebase database once for the data
    const eventRef = base.database().ref(`events/${this.props.params.eventId}`);
    eventRef.once('value', (snapshot) => {
      this.setState(snapshot.val() || {});
    });
  }
  
  render() {
    const wrapperDivStyles = { textAlign: 'center', marginTop: '30px' };

    if (this.state) {
      if (Object.keys(this.state).length === 0) {
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
        }
      };
      
      const { name, description } = this.state;
      
      return (
        <Grid>
          <Paper style={styles.paper} zDepth={1} rounded={false}>
            <h1 style={{ textAlign: 'center' }}>{name}</h1>
            <Divider style={{ marginBottom: 20 }} />
            <Row>
              <Col xs={12} sm={4} md={3}>
                <MobileTearSheet>
                  <Subheader>The Deets</Subheader>
                </MobileTearSheet>
              </Col>
              <Col xs={12} sm={8} md={9}>{description}</Col>
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
