import React from 'react';
import { withRouter } from '../withRouter';
import MessageCard from './MessageCard';
import Error from '../Error';

class MessagesList extends React.Component {
  state = {
    reading: 0,
    messages: [{}],
  };

  componentDidMount() {
    const status = this.state.reading;
    const state = this.props.location.state?.reading;
    if (state) {
      this.setState({ reading: state });
      this.getMessages(state);
    } else {
      this.getMessages(status);
    }
  }

  getMessages = status => {
    const locationId = this.props.location.state?.locationId;
    fetch(`/location/card/${locationId}/messages/${status}`)
      .then(res => res.json())
      .then(messages => {
        this.setState({ messages });
      });
  };

  readingMessages = () => {
    this.setState({ reading: 1 });

    const status = 1;

    const locationId = this.props.location.state?.locationId;
    fetch(`/location/card/${locationId}/messages/${status}`)
      .then(res => res.json())
      .then(messages => {
        this.setState({ messages });
      });
  };

  unreadMessages = () => {
    this.setState({ reading: 0 });

    const status = 0;

    const locationId = this.props.location.state?.locationId;
    fetch(`/location/card/${locationId}/messages/${status}`)
      .then(res => res.json())
      .then(messages => {
        this.setState({ messages });
      });
  };

  openMessage = (id, text) => {
    const locationId = this.props.location.state?.locationId;
    this.props.navigate(`/location/card/${locationId}/message/${id}`, {
      state: { text, locationId, reading: this.state.reading, url: this.props.location.state.url },
    });
  };

  deleteMessage = id => {
    const locationId = this.props.location.state?.locationId;
    fetch(`/location/card/${locationId}/message/${id}/delete`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ id }),
    }).then(() => {
      let status = this.state.reading;
      this.getMessages(status);
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
    let id = this.props.location.state?.locationId;
    if (id) {
      return (
        <div className="container-fluid">
          <div className="row justify-content-center p-2">
            <div className="col-12">
              <button className="col-12 btn btn-outline-secondary mb-2" onClick={this.return}>
                Вернуться назад
              </button>
              <button className="col-12 btn btn-outline-secondary" onClick={this.readingMessages}>
                Прочитанные
              </button>
              <button className="col-12 mt-2 btn btn-outline-success" onClick={this.unreadMessages}>
                Непрочитанные
              </button>
            </div>

            {messages.map((item, index) => (
              <div className="border border-4 rounded mt-2" key={index + 1}>
                <MessageCard text={item.text} />
                <button
                  className="col-12 mt-2 btn btn-outline-success"
                  onClick={() => {
                    this.openMessage(item.id, item.message);
                  }}
                >
                  Прочитать
                </button>
                <button
                  className="col-12 mt-2 mb-2 btn btn-outline-danger"
                  onClick={() => {
                    this.deleteMessage(item.id);
                  }}
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Error />
        </div>
      );
    }
  }
}

export default withRouter(MessagesList);
