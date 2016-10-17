import React, {
  Component,
  PropTypes,
} from 'react';
import { Link } from 'react-router';

class NotFound extends Component {
  render() {
    return (
      <div className="not-found">
        <h2>Four oh Four</h2>
        <Link to="/">Take me home</Link>
      </div>
    );
  }
}

NotFound.propTypes = {};
NotFound.defaultProps = {};

export default NotFound;
