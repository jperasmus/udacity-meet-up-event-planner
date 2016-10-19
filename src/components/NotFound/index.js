import React, {
  Component,
} from 'react';
import { Link } from 'react-router';
import styles from './index.scss';

class NotFound extends Component {
  render() {
    return (
      <div className={styles.notFound}>
        <h1>Four-oh-Four</h1>
        <Link to="/">Take me home</Link>
      </div>
    );
  }
}

export default NotFound;
