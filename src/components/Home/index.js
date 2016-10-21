import React, { Component } from 'react';
import base from '../../base';
import sampleEvents from '../../sample-events';
import RaisedButton from 'material-ui/RaisedButton';
import EventsList from '../EventsList';

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    
    this.loadSampleEvents = this.loadSampleEvents.bind(this);
    
    this.state = {
      events: {}
    };
  }
  
  componentWillMount() {
    this.eventsRef = base.syncState(`events`, {
      context: this,
      state: 'events'
    });
  }
  
  componentWillUnmount() {
    base.removeBinding(this.eventsRef);
  }
  
  loadSampleEvents() {
    this.setState({
      events: sampleEvents
    })
  }
  
  render() {
    const loadBtnStyles = { margin: 10, float: 'right' };
    const { events } = this.state;
    const eventsExist = events && Object.keys(events).length !== 0;
    return (
      <div>
        <RaisedButton label="Load Sample Events" disabled={eventsExist} secondary={true} style={loadBtnStyles} onTouchTap={this.loadSampleEvents} />
        <h2>Upcoming Events</h2>
        <EventsList events={events} showFilter={true} />
      </div>
    );
  }
}

export default Home;
