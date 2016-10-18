import React, {
  PropTypes,
} from 'react';
import './index.css';

const EventsList = (props) => {
  return (
    <div>
      {props.events}
    </div>
  );
};

EventsList.propTypes = {
  events: PropTypes.array.isRequired,
  showFilter: PropTypes.bool
};

EventsList.defaultProps = {
  events: [],
  showFilter: false
};

export default EventsList;
