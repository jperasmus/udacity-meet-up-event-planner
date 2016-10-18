import React, {
  Component,
  PropTypes,
} from 'react';
import { Link } from 'react-router';
import './index.css';

class NotFound extends Component {
  render() {
    return (
      <div className="not-found">
        <h1>Four-oh-Four</h1>
        <Link to="/" className="">Take me home</Link>
      </div>
    );
  }
}

NotFound.propTypes = {};
NotFound.defaultProps = {};

export default NotFound;
