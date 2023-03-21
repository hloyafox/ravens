import React from 'react';
import { withRouter } from '../withRouter';
import DropDownLocation from './DropDownLocation';

// выпадающий список с выбором локации, который передает id ворона(this.props.ravenId), текст сообщение и id локации-адресата в таблицу с сообщениями, а потом в таблице с воронами
// меняет локацию расположения (location_id)

class EditMessage extends React.Component {
  constructor(props) {
    super(props);
    //creating ref
    this.childRef = React.createRef();
  }
  state = {
    location: this.props.location.state.locationId,
    raven: this.props.location.state.ravenId,
    adress: 0,
    text: '',
  };

  componentDidMount() {}

  onInnputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  sendMessage = () => {
    const adress = +this.childRef.current.state.adress;
    const text = this.state.text;
    if (adress !== 0) {
      console.log('ref', adress);
      this.requestMessage(text, adress);
      this.editRaven(adress);
      this.props.navigate(-1);
    } else {
      const doc = document.getElementById('select');
      doc.style.borderColor = 'red';
    }
  };

  requestMessage = (text, adress) => {
    const id = this.state.raven;
    fetch(`/location/card/${id}/ravens/send`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ text, ravenId: id, locationId: adress, reading: 0 }),
    });
  };

  editRaven = newId => {
    const id = this.state.raven;
    fetch(`/location/card/${id}/ravens/change`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ newId: newId }),
    });
  };
  // get на все локации, потом отбор на все, кроме текущей
  render() {
    return (
      <div>
        <DropDownLocation ref={this.childRef} id={this.state.location} />
        <input type="textarea" name="text" id="message" onChange={this.onInnputChange} />
        <button onClick={this.sendMessage} id="send">
          Отправить сообщение
        </button>
      </div>
    );
  }
}

export default withRouter(EditMessage);
