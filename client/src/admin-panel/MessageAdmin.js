import React from 'react';
import { withRouter } from '../withRouter';
import ErrorPage from '../ErrorPage';

class MessageAdmin extends React.Component {
  state = {
    text: '',
    status: 0,
    reading: 0,
  };

  componentDidMount() {
    const id = this.props.params.messageId;
    const locationId = this.props.params.locationId;
    this.getMessage(id, locationId);
  }
  getMessage = (id, locationId) => {
    fetch(`/admin/${locationId}/message/${id}/read`)
      .then(res => res.json())
      .then(res => {
        this.setState({ text: res[0].text, status: res[0].status });
      });
  };

  render() {
    const locationId = this.props.params.locationId;
    const url = this.props.location.state?.url;

    if (url) {
      return (
        <div className="container-fluid">
          <div className="row justify-content-center p-2">
            <p className="fs-4">{this.state.text}</p>
            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                this.props.navigate(`/admin/location/${locationId}/`, {
                  state: {
                    url: this.props.location?.state.url,
                    locationId: this.props.params.locationId,
                    action: 3,
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

export default withRouter(MessageAdmin);
