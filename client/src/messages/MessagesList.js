import React from 'react';
import { withRouter } from '../withRouter';
import MessageCard from './MessageCard';

class MessagesList extends React.Component {
  state = {
    reading: 0,
    messages: [{}],
  };

  // messages = [
  //   { id: 1, message: 'У нас война!', reading: 1 },
  //   { id: 2, message: 'Oh my god!', reading: 1 },
  //   { id: 3, message: 'Give me some money!', reading: 0 },
  //   { id: 4, message: 'Эй там!', reading: 0 },
  // ];

  componentDidMount() {
    const status = this.state.reading;
    console.log(status);
    this.getMessages(status);
  }

  componentDidUpdate() {
    // const status = this.state.reading;
    // console.log(status);
    // this.getMessages(status);
  }

  getMessages = status => {
    const locationId = this.props.location.state.locationId;
    fetch(`/location/card/${locationId}/messages/${status}`)
      .then(res => res.json())
      .then(messages => {
        this.setState({ messages });
      });
  };

  readingMessages = () => {
    this.setState({ reading: 1 });

    const status = 1;

    const locationId = this.props.location.state.locationId;
    fetch(`/location/card/${locationId}/messages/${status}`)
      .then(res => res.json())
      .then(messages => {
        this.setState({ messages });
      });
    //   this.setState({ reading: 1 });
    //   let messages = [];
    //   this.messages.forEach(item => {
    //     if (item.reading === 1) {
    //       let newObj = {};
    //       newObj['id'] = item.id;
    //       newObj['message'] = item.message;
    //       messages.push(newObj);
    //       this.setState({ messages });
    //     }
    //   });
  };

  unreadMessages = () => {
    this.setState({ reading: 0 });

    const status = 0;

    const locationId = this.props.location.state.locationId;
    fetch(`/location/card/${locationId}/messages/${status}`)
      .then(res => res.json())
      .then(messages => {
        this.setState({ messages });
      });
    //   this.setState({ reading: 0 });
    //   let messages = [];
    //   this.messages.forEach(item => {
    //     if (item.reading === 0) {
    //       let newObj = {};
    //       newObj['id'] = item.id;
    //       newObj['message'] = item.message;
    //       messages.push(newObj);
    //       this.setState({ messages });
    //     }
    //   });
  };

  openMessage = (id, text) => {
    const locationId = this.props.location.state.locationId;
    this.props.navigate(`/location/card/${locationId}/message/${id}`, { state: { text } });
  };

  render() {
    const messages = this.state.messages;
    console.log(messages);
    return (
      <div>
        <button onClick={this.readingMessages}>Reading</button>
        <button onClick={this.unreadMessages}>Unread</button>

        {messages.map((item, index) => (
          <div key={index + 1}>
            <MessageCard text={item.text} />
            <button
              onClick={() => {
                this.openMessage(item.id, item.message);
              }}
            >
              прочитать
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(MessagesList);
