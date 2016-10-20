import React, {
  Component,
  PropTypes,
} from 'react';
import { ValidationEngine, mapCodeToMessage } from '../../helpers';
import base from '../../base';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

class Login extends Component {
  constructor(props, context) {
    super(props, context);
    
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.submitForm = this.submitForm.bind(this);

    this.state = {
      emailError: '',
      passwordError: '',
      formError: '',
      canSubmit: false
    };

    const validationRules = {
      email: [
        {
          rule: 'required',
          msg: 'Please provide an email'
        },
        {
          rule: 'isEmail',
          msg: 'Please provide a valid email'
        }
      ],
      password: [
        {
          rule: 'required',
          msg: 'Please provide a password'
        },
        {
          rule: 'isStrongPassword',
          msg: 'You need at least: 6+ characters, UPPERCASE letters, lowercase letters, numb3rs & special ch@racters'
        }
      ]
    };
    
    this.validationEngine = new ValidationEngine(validationRules);
  }

  onSignUp(e) {
    e.preventDefault();
    this.context.router.transitionTo('/sign-up');
  }
  
  onFieldChange(event, value) {
    const fieldName = event.target.name;
    const fieldError = this.validationEngine.isValid(fieldName, value);
    
    this.setState({
      [`${fieldName}Error`]: fieldError,
      [fieldName]: value
    });
  }
  
  onFormChange() {
    window.setTimeout(() => {
      this.setState({
        formError: '',
        canSubmit: this.validationEngine.allFieldsValid(this.state)
      });
    });
  }
  
  enableButton() {
    this.setState({
      canSubmit: true
    });
  }
  
  disableButton() {
    this.setState({
      canSubmit: false
    });
  }
  
  authHandler(err, user) {
    if (err) {
      this.setState({
        formError: mapCodeToMessage(err.code) || 'Login failed'
      });
      return this.enableButton();
    }
    this.context.router.transitionTo('/profile');
  }
  
  submitForm(e) {
    e.preventDefault();
    this.disableButton();
    base.authWithPassword({
      email: this.state.email,
      password: this.state.password
    }, this.authHandler);
  }
  
  render() {
    const styles = {
      header: {
        marginTop: 0,
        textAlign: 'center'
      },
      paper: {
        width: '100%',
        maxWidth: 400,
        margin: '20px auto 10px',
        padding: 20
      },
      submit: {
        marginTop: 30,
      },
      footer: {
        textAlign: 'center'
      },
      footerLink: {
        cursor: 'pointer'
      },
      forgotPassword: {
        marginTop: 10,
        marginBottom: 10,
      }
    };
    
    return (
      <Paper style={styles.paper}>
        <h1 style={styles.header}>Login</h1>
        <Snackbar
          open={!!this.state.formError}
          message={this.state.formError}
        />
        <form onChange={this.onFormChange} onSubmit={this.submitForm}>
          {/* NOTE: HTML5 input attributes need to be specified in camelCase like autoComplete instead of autocomplete */}
          <TextField
            name="email"
            errorText={this.state.emailError}
            type="email"
            autoFocus
            autoComplete="nope"
            fullWidth={true}
            hintText="What is your email?"
            floatingLabelText="Email"
            onChange={this.onFieldChange}
          />
          <TextField
            name="password"
            errorText={this.state.passwordError}
            type="password"
            autoComplete="nope"
            fullWidth={true}
            hintText="What is your password?"
            floatingLabelText="Password"
            onChange={this.onFieldChange}
          />
          <div style={styles.footer}>
            <RaisedButton
              style={styles.submit}
              type="submit"
              label="Login"
              secondary={true}
              disabled={!this.state.canSubmit}
            />
            <div style={styles.forgotPassword}>
              <a className="specialFont" style={styles.footerLink}>Forgot my password</a>
              <span> | </span>
              <a className="specialFont" style={styles.footerLink} onTouchTap={this.onSignUp}>Sign me up</a>
            </div>
          </div>
        </form>
      </Paper>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.object
};

export default Login;
