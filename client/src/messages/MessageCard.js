import React from 'react';
import { withRouter } from '../withRouter';

class MessageCard extends React.Component {
  render() {
    return (
      <div className="col-12 col-md mt-2 mb-1">
        <div className="card">
          <div className="card-body">{this.props.text}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(MessageCard);
