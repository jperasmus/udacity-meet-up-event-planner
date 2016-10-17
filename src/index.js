import React from 'react';
import './index.css';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import App from './components/App';
import Event from './components/Event';
import NotFound from './components/NotFound';

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={App} />
        {/*<Match exactly pattern="/new-event" component={EventForm} />*/}
        {/*<Match exactly pattern="/profile" component={Profile} />*/}
        <Match pattern="/events/:eventId" component={Event} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

render(<Root/>, document.getElementById('root'));
