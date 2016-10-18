import React, {
  PropTypes,
} from 'react';
import EventSummary from '../EventSummary';
import './index.css';

const EventsList = (props) => {
  const preppedEvents = Object
    .keys(props.events)
    .map(name => props.events[name]);
  console.log(preppedEvents);

  return (
    <div>
      {preppedEvents.map((event, index) => <EventSummary key={`event-${index}`} event={event} />)}
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
