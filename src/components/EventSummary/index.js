import React, { PropTypes } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const EventSummary = (props, context) => {
  const { name, description, host, owner, slug } = props.event;
  
  const browseToEvent = (slug = '') => {
    context.router.transitionTo(`/events/${slug}`);
  };
  
  return (
    <Card style={{ marginBottom: '15px' }}>
      <CardHeader
        title={`${name}${host.name ? ` - hosted by: ${host.name}` : ''}`}
        avatar={`https://api.adorable.io/avatars/50/${owner || 'jp'}.png`}
      />
      {/*<CardMedia overlay={<CardTitle title={name} />}>*/}
        {/*<img src={`https://api.adorable.io/avatars/500/${owner || 'jp'}.png`} />*/}
      {/*</CardMedia>*/}
      <CardText>{description}</CardText>
      <CardActions>
        <FlatButton label="View Event" onTouchTap={() => browseToEvent(slug)} />
      </CardActions>
    </Card>
  )
};

EventSummary.propTypes = {
  event: PropTypes.object.isRequired
};
EventSummary.contextTypes = {
  router: PropTypes.object
};

export default EventSummary;
