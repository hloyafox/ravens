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
  };

  componentDidMount() {}

  sendMessage = () => {
    const adress = +this.childRef.current.state.adress;
    if (adress !== 0) {
      console.log('ref', adress);
      const doc = document.getElementById('select');
      doc.style.borderColor = null;
    } else {
      const doc = document.getElementById('select');
      doc.style.borderColor = 'red';
    }
  };

  // get на все локации, потом отбор на все, кроме текущей
  render() {
    return (
      <div>
        <DropDownLocation ref={this.childRef} id={this.state.location} />
        <input type="text" name="message" id="message" />
        <button onClick={this.sendMessage} id="send">
          Отправить сообщение
        </button>
      </div>
    );
  }
}

export default withRouter(EditMessage);
