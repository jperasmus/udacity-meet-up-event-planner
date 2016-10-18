import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Event from './components/Event';
import NotFound from './components/NotFound';
import 'sanitize.css/sanitize.css';

const Root = () => {
  return (
    <BrowserRouter>
      <App>
        <Match exactly pattern="/" component={Home} />
        {/*<Match exactly pattern="/new-event" component={EventForm} />*/}
        {/*<Match exactly pattern="/profile" component={Profile} />*/}
        <Match pattern="/events/:eventId" component={Event} />
        <Miss component={NotFound} />
      </App>
    </BrowserRouter>
  )
}

render(<Root/>, document.getElementById('root'));
