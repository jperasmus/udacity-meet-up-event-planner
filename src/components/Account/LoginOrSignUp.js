import React, {
  Component,
  PropTypes
} from 'react';
import { ValidationEngine, mapCodeToMessage, createUserDBObject } from '../../helpers';
import loginValidationRules from './loginValidationRules';
import signupValidationRules from './signupValidationRules';
import base from '../../base';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import DatePicker from 'material-ui/DatePicker';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

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

/**
 * Component used for both login and registration
 */
class LoginOrSignUp extends Component {
  constructor(props, context) {
    super(props, context);
    
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onBirthdayChange = this.onBirthdayChange.bind(this);
    this.onForgotPasswordLinkClick = this.onForgotPasswordLinkClick.bind(this);
    this.onFormSwitchClick = this.onFormSwitchClick.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
    this.disableSubmitButton = this.disableSubmitButton.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this._s = this._s.bind(this);

    this.state = {
      displayNameError: '',
      emailError: '',
      passwordError: '',
      websiteError: '',
      employerError: '',
      birthdayError: '',
      formError: '',
      canSubmit: false
    };
    
    this.isLogin = props.pathname === '/login';
    this.validationEngine = new ValidationEngine(this._s(loginValidationRules, signupValidationRules));
  }
  
  /**
   * Method to help switch between Login and Sign-up options
   */
  _s(loginTrue, signUpTrue) {
    return this.isLogin ? loginTrue : signUpTrue;
  }
  
  onForgotPasswordLinkClick(e) {
    e.preventDefault();
    base.resetPassword({
      email: this.state.email || ''
    }, (err) => this.setState({ formError: mapCodeToMessage(err.code) || 'You made babies cry' }));
  }
  
  onFormSwitchClick(e) {
    e.preventDefault();
    this.context.router.transitionTo(this._s('/sign-up', '/login'));
  }

  onFieldChange(event, value) {
    const fieldName = event.target.name;
    const fieldError = this.validationEngine.isValid(fieldName, value);
    
    this.setState({
      [`${fieldName}Error`]: fieldError,
      [fieldName]: value
    });
  }
  
  onBirthdayChange(event, date) {
    const fieldName = 'birthday';
    const fieldError = this.validationEngine.isValid(fieldName, date);
  
    this.setState({
      [`${fieldName}Error`]: fieldError,
      [fieldName]: date
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
  
  enableSubmitButton() {
    this.setState({ canSubmit: true });
  }
  
  disableSubmitButton() {
    this.setState({ canSubmit: false });
  }
  
  authHandler(err, user) {
    if (err) {
      this.setState({
        formError: mapCodeToMessage(err.code) || `${this._s('Login', 'Sign-up')} failed`
      });
      return this.enableSubmitButton();
    }
    
    // If new registration we need to create the basic user object structure
    if (!this.isLogin && user) {
      createUserDBObject(Object.assign({}, user, this.state, { birthday: this.state.birthday ? (this.state.birthday).toString() : '' }));
    }
    
    this.context.router.transitionTo('/profile');
  }
  
  onFormSubmit(e) {
    e.preventDefault();
    this.disableSubmitButton();

    base[this._s('authWithPassword', 'createUser')]({
      email: this.state.email,
      password: this.state.password
    }, this.authHandler);
  }
  
  render() {
    return (
      <Paper style={styles.paper}>
        <h1 style={styles.header}>{this._s('Login', 'Sign-up')}</h1>
        <Snackbar
          open={!!this.state.formError}
          message={this.state.formError}
        />
        <form onChange={this.onFormChange} onSubmit={this.onFormSubmit}>
          {/* NOTE: HTML5 input attributes need to be specified in camelCase like autoComplete instead of autocomplete */}
          {
            !this.isLogin
              ? <TextField
                name="displayName"
                errorText={this.state.displayNameError}
                type="text"
                autoFocus
                autoComplete="name"
                fullWidth={true}
                hintText="What should we call you?"
                floatingLabelText="Your name"
                onChange={this.onFieldChange}
              />
              : ''
          }
          <TextField
            name="email"
            errorText={this.state.emailError}
            type="email"
            autoComplete="email"
            fullWidth={true}
            hintText="What is your email?"
            floatingLabelText="Email"
            onChange={this.onFieldChange}
          />
          <TextField
            name="password"
            errorText={this.state.passwordError}
            type="password"
            autoComplete="current-password"
            fullWidth={true}
            hintText="What is your password?"
            floatingLabelText="Password"
            onChange={this.onFieldChange}
          />
          {
            !this.isLogin
              ? <div>
                  <Subheader style={{ textAlign: 'center' }}>Optional Fields</Subheader>
                  <TextField
                    name="website"
                    errorText={this.state.websiteError}
                    type="url"
                    autoComplete="off"
                    fullWidth={true}
                    hintText="Share your website"
                    floatingLabelText="Website"
                    onChange={this.onFieldChange}
                  />
                  <TextField
                    name="employer"
                    errorText={this.state.employerError}
                    type="text"
                    autoComplete="off"
                    fullWidth={true}
                    hintText="Where do you work?"
                    floatingLabelText="Company"
                    onChange={this.onFieldChange}
                  />
                  <DatePicker
                    name="birthday"
                    value={this.state.birthday}
                    floatingLabelText="Birthday"
                    errorText={this.state.birthdayError}
                    mode="landscape"
                    autoOk={true}
                    maxDate={new Date()}
                    fullWidth={true}
                    onChange={this.onBirthdayChange}
                  />
                  <Checkbox
                    label="I agree this site is cool"
                    defaultChecked={true}
                    style={{ marginTop: 15 }}
                  />
                </div>
              : ''
          }
          <div style={styles.footer}>
            <RaisedButton
              style={styles.submit}
              type="submit"
              label={this._s('Login', 'Sign-up')}
              secondary={true}
              disabled={!this.state.canSubmit}
            />
            <div style={styles.forgotPassword}>
              <a className="specialFont" style={styles.footerLink} onTouchTap={this.onForgotPasswordLinkClick}>Forgot my password</a>
              <span> | </span>
              <a className="specialFont" style={styles.footerLink} onTouchTap={this.onFormSwitchClick}>
                {this._s('Sign me up', 'I have an account')}
              </a>
            </div>
          </div>
        </form>
      </Paper>
    );
  }
}

LoginOrSignUp.contextTypes = {
  router: PropTypes.object
};

export default LoginOrSignUp;
