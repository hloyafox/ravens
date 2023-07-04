import React from 'react';
import { withRouter } from '../withRouter';
import MessageCard from '../messages/MessageCard';

import ErrorPage from '../ErrorPage';

class MessageList extends React.Component {
  state = {
    locationId: 0,
    messages: [{}],
  };

  componentDidMount() {
    const id = this.props.id;
    this.setState({ locationId: id });
    this.getAllMessages(id);
  }

  getAllMessages = location => {
    fetch(`/admin/location/card/${location}/messages/`)
      .then(res => res.json())
      .then(messages => {
        this.setState({ messages });
      });
  };

  openMessage = (id, text) => {
    const location = this.props.id;
    this.props.navigate(`/admin/${location}/message/${id}`, {
      state: { text, location, url: this.props.url },
    });
  };

  return = () => {
    const locationId = this.props.location.state?.locationId;
    this.props.navigate(`/location/card/${locationId}`, {
      state: {
        locationId: this.props.location.state?.locationId,
        url: this.props.location.state.url,
      },
    });
  };

  render() {
    const messages = this.state.messages;
    let id = this.state.locationId;
    if (id) {
      return (
        <div className="container-fluid">
          <div className="row justify-content-center p-2">
            {messages.map((item, index) => {
              if (item.text) {
                return (
                  <div className="border border-4 rounded mt-2" key={index + 1}>
                    <MessageCard text={item.text} />
                    <button
                      className="col-12 mt-2 mb-2 btn btn-outline-success"
                      onClick={() => {
                        this.openMessage(item.id, item.text);
                      }}
                    >
                      Прочитать
                    </button>
                  </div>
                );
              }
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <ErrorPage />
        </div>
      );
    }
  }
}

export default withRouter(MessageList);
