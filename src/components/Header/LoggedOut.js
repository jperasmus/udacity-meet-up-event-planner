import React, {
  Component,
  PropTypes
} from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

class Login extends Component {
  static muiName = 'FlatButton';
  
  render() {
    return (
      <FlatButton
        {...this.props}
        label="Login"
        labelPosition="before"
        onTouchTap={this.props.onLoginClick}
        icon={<FontIcon className="material-icons">lock</FontIcon>}
      />
    );
  }
}

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired
};

Login.defaultProps = {
  onLoginClick: () => {}
};

export default Login;
