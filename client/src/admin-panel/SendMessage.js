import React from 'react';
import { withRouter } from '../withRouter';
import Error from '../Error';
import DropDownLocation from '../messages/DropDownLocation';

class SendMessage extends React.Component {
  constructor(props) {
    super(props);
    //creating ref
    this.childRef = React.createRef();
  }
  state = {
    admin: 0,
    sending: 0,
    raven: 0,
    url: '',
  };

  componentDidMount() {
    if (this.props.location.state) {
      if (this.props.location.state.admin === 1) {
        this.setState({
          admin: this.props.location.state.admin,
          url: this.props.location.state?.url,
        });
        // this.getAllLocations();
      }
    }
  }

  return = () => {
    this.props.navigate(`/location/admin/0`, {
      state: {
        url: this.state.url,
      },
    });
  };

  sendMessage = () => {
    const adress = +this.childRef.current.state.adress;
    const text = this.state.text;
    if (adress !== 0) {
      this.requestMessage(text, adress);
      let input = document.getElementsByName('text')[0];
      input.value = '';
      this.setState({ sending: 1, text: '' });
    } else {
      const doc = document.getElementById('select');
      doc.style.borderColor = 'red';
    }
  };

  requestMessage = (text, adress) => {
    const id = this.state.raven;
    fetch(`/location/admin/send`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ text, ravenId: id, locationId: adress, reading: 0 }),
    });
  };

  onInnputChange = e => {
    this.setState({ [e.target.name]: e.target.value, sending: 0 });
  };

  render() {
    let admin = this.state.admin;
    let sending = this.state.sending;
    if (admin === 1) {
      return (
        <div className="container-fluid text-center mt-2">
          <div className="row justify-content-center p-2">
            <div className="col-12">
              <button className="btn btn-outline-dark m-2" onClick={this.return}>
                Вернуться назад
              </button>
            </div>
            <DropDownLocation ref={this.childRef} id={1} />
            <textarea
              className="form-control m-2"
              name="text"
              id="message"
              onChange={this.onInnputChange}
            />
            <button className="btn btn-outline-success mt-2" onClick={this.sendMessage} id="send">
              Отправить сообщение
            </button>
            {sending === 1 ? <p className="text-success">Сообщение отправлено</p> : null}
          </div>
        </div>
      );
    } else {
      return <Error />;
    }
  }
}

export default withRouter(SendMessage);
