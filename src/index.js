import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Event from './components/Event';
import EventForm from './components/EventForm';
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import 'sanitize.css/sanitize.css';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const Root = () => {
  return (
    <BrowserRouter>
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <App>
          <Match exactly pattern="/" component={Home} />
          <Match exactly pattern="/new-event" component={EventForm} />
          <Match exactly pattern="/profile" component={Profile} />
          <Match pattern="/events/:eventId" component={Event} />
          <Miss component={NotFound} />
        </App>
      </MuiThemeProvider>
    </BrowserRouter>
  );
};

render(<Root/>, document.getElementById('root'));
