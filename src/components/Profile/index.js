import React, {
  Component,
  PropTypes,
} from 'react';
import base from '../../base';

class Profile extends Component {
  componentDidMount() {
    const userRef = window.localStorage.getItem(`rendezvous-user`) || false;
    
    if (userRef) {
      this.userRef = base.bindToState(`users/${userRef}`, {
        context: this,
        state: 'user'
      });
    }
  }
  
  componentWillUnmount() {
    base.removeBinding(this.userRef);
  }
  
  render() {
    return (
      <div>User's profile</div>
    );
  }
}

Profile.propTypes = {};
Profile.defaultProps = {};

export default Profile;
