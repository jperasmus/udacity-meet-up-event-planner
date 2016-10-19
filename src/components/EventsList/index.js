import React, {
  PropTypes,
} from 'react';
import EventSummary from '../EventSummary';
import CircularProgress from 'material-ui/CircularProgress';
import './index.css';

const EventsList = (props) => {
  const wrapperDivStyles = { textAlign: 'center', marginTop: '30px' };
  const preppedEvents = Object
    .keys(props.events)
    .map(name => props.events[name])
    .slice(0, 10);  // Just show the first 10 events for in case there's a load of them (not a real app in any case)

  if (preppedEvents.length > 0) {
    return (
      <div>
        {/* TODO: Implement filter here */}
        {preppedEvents.map((event, index) => <EventSummary key={`event-${index}`} event={event} />)}
      </div>
    );
  }
  
  return (
    <div style={wrapperDivStyles}>
      <CircularProgress size={80} thickness={5} />
    </div>
  );
};

EventsList.propTypes = {
  events: PropTypes.object.isRequired,
  showFilter: PropTypes.bool
};

EventsList.defaultProps = {
  events: {},
  showFilter: false
};

export default EventsList;
