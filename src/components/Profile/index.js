import React, {
  Component,
} from 'react';
import base from '../../base';

class Profile extends Component {
  componentDidMount() {
    const userRef = base.getAuth().uid || false;
    
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

export default Profile;
