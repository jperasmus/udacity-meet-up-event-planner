import base from './base';

export const ValidationEngine = function(rules) {
  const validators = {
    required(value) {
      return !!value;
    },
    isEmail(value) {
      // Very simple regex pattern that isn't too strict, ie <anything>@<anything>.<at-least-2-of-anything>
      // Not like this: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
      return /.+@.+\..{2,}/.test(value);
    },
    hasUpperCase(value) {
      return /[A-Z]/.test(value);
    },
    hasLowerCase(value) {
      return /[a-z]/.test(value);
    },
    hasNumber(value) {
      return /[0-9]/.test(value);
    },
    hasSpecialChars(value) {
      const stripped = value.match(/[A-Za-z0-9]/g).join('');
      // If stripped string and original is the same there are no other characters
      // My attempt at not needing to know all valid possible "special characters"
      return stripped !== value;
    },
    isStrongPassword(value) {
      // TODO: Consider extending this to return specific errors per "sub-criteria-check"
      return value && value.length > 6 && validators.hasUpperCase(value) && validators.hasLowerCase(value) && validators.hasNumber(value) && validators.hasSpecialChars(value);
    }
  };
  
  const processFieldRules = (fieldRules, value) => {
    if (!Array.isArray(fieldRules)) {
      throw new Error('Validation rules should be specified as an array of objects');
    }
    
    let errors = [];
    fieldRules.forEach((fieldRule) => {
      const fn = validators[fieldRule.rule];
      if (fn && typeof fn === 'function') {
        if (!fn(value)) {
          errors.push(fieldRule.msg || fieldRule.rule);
        }
      }
    });
    return errors;
  };
  
  const rulesToWatch = Object.keys(rules);
  
  this.isValid = function(name, value) {
    if (rulesToWatch.includes(name)) {
      const fieldRules = rules[name];
      const errors = processFieldRules(fieldRules, value);
      return errors.length ? errors[0] : null;
    }
    return false;
  };
  
  this.allFieldsValid = function(state) {
    const problems = rulesToWatch.filter((rule) => !!this.isValid(rule, state[rule]));
    return problems.length === 0;
  };

  return this;
};


export const mapCodeToMessage = (code) => {
  const phrases = {
    'auth/user-not-found': 'That username and password combination is invalid.',
    'auth/user-disabled': 'That username and password combination is invalid.',
    'auth/invalid-email': 'That username and password combination is invalid.',
    'auth/wrong-password': 'That username and password combination is invalid.',
    'auth/argument-error': 'You need to specify an email',
  };
  return phrases[code];
};

/**
 * Create the object structure for a user in firebase.
 * @param user Object At a minimum the user object should contain the uid and email of the user.
 */
export const createUserDBObject = (data) => {
  base.database().ref(`users/${data.uid}`).set({
    uid: data.uid,
    email: data.email,
    displayName: data.displayName || '',  // For something like a meet-up site we don't need to know the person's first name and last name separately
    employer: data.employer || '',
    website: data.website || '',
    birthday: data.birthday || '',
    facebook: data.facebook || '',
    github: data.github || '',
    twitter: data.twitter || '',
    instagram: data.instagram || '',
    eventsHosted: {},
    eventsAttended: {}
  });
};
