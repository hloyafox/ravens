import React from 'react';
import { withRouter } from '../withRouter';

class Message extends React.Component {
  state = {
    text: '',
    status: 0,
  };

  componentDidMount() {
    const id = this.props.params.messageId;
    const locationId = this.props.params.locationId;
    this.getMessage(id, locationId);
    const status = this.state.status;
    if (status === 0) {
      this.changeStatus(id, locationId);
    }
  }
  getMessage = (id, locationId) => {
    fetch(`/location/card/${locationId}/message/${id}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({ text: res[0].text, status: res[0].status });
      });
  };

  changeStatus = (id, locationId) => {
    fetch(`/location/card/${locationId}/message/${id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ reading: 1 }),
    });
  };

  render() {
    return (
      <div>
        <p>{this.state.text}</p>
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
