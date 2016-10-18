import React, {
  Component,
  PropTypes,
} from 'react';
import EventsList from '../EventsList';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Upcoming Events</h1>
        <EventsList events={[]} showFilter={true} />
      </div>
    );
  }
}

Home.propTypes = {};
Home.defaultProps = {};

export default Home;
