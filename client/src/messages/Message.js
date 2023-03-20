import React from 'react';
import { withRouter } from '../withRouter';

class Message extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.location.state.text}</p>
        <button
          onClick={() => {
            this.props.navigate(-1);
          }}
        >
          Назад
        </button>
      </div>
    );
  }
}

export default withRouter(Message);
