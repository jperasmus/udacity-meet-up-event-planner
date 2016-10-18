import React, {
  Component,
  PropTypes,
} from 'react';
import FlatButton from 'material-ui/FlatButton';

class Login extends Component {
  static muiName = 'FlatButton';
  
  render() {
    return (
      <FlatButton {...this.props} label="Login" />
    );
  }
}

Login.propTypes = {};
Login.defaultProps = {};

export default Login;
