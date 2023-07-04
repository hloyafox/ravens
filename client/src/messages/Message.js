import React from 'react';
import { withRouter } from '../withRouter';
import ErrorPage from '../ErrorPage';

class Message extends React.Component {
  state = {
    text: '',
    status: 0,
    reading: 0,
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
    fetch(`/location/card/${locationId}/message/${id}/read`)
      .then(res => res.json())
      .then(res => {
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
    const locationId = this.props.params.locationId;
    const reading = this.props.location.state?.reading;
    const url = this.props.location.state?.url;
    if (url) {
      return (
        <div className="container-fluid">
          <div className="row justify-content-center p-2">
            <p className="fs-4">{this.state.text}</p>
            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                this.props.navigate(`/location/card/${locationId}/messages`, {
                  state: {
                    reading: reading,
                    url: this.props.location?.state.url,
                    locationId: this.props.params.locationId,
                  },
                });
              }}
            >
              К письмам
            </button>
          </div>
        </div>
      );
    } else {
      return <ErrorPage />;
    }
  }
}

export default withRouter(Message);
