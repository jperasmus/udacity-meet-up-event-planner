export default {
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
