import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';

const style = {
  height: 80,
  width: '100%',
  padding: 15,
  marginTop: 15,
  fontSize: '.75rem',
  textAlign: 'left',
  display: 'block'
};

const Footer = (props) => {
  return (
    <Paper rounded={false} zDepth={0} style={style}>
      rendezvous
      ˈrɒndɪvuː,-deɪvuː/
      <p>
        noun
        1.
        a meeting at an agreed time and place.
        "Edward turned up late for their rendezvous"
        synonyms:	meeting, appointment, engagement
      </p>
    </Paper>
  );
};

export default Footer;
