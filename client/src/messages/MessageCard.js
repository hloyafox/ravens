import React from 'react';
import { withRouter } from '../withRouter';

class MessageCard extends React.Component {
  render() {
    return <div>{this.props.text}</div>;
  }
}

export default withRouter(MessageCard);
