import React from 'react';
import { withRouter } from '../withRouter';
import DropDownLocation from './DropDownLocation';
import Error from '../Error';
// выпадающий список с выбором локации, который передает id ворона(this.props.ravenId), текст сообщение и id локации-адресата в таблицу с сообщениями, а потом в таблице с воронами
// меняет локацию расположения (location_id)

class EditMessage extends React.Component {
  constructor(props) {
    super(props);
    //creating ref
    this.childRef = React.createRef();
  }
  state = {
    location: this.props.location.state?.locationId,
    raven: this.props.location.state?.ravenId,
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
      this.allReq(text, adress);
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

  return = () => {
    this.props.navigate(-1);
  };

  allReq = (text, adress) => {
    Promise.all([this.requestMessage(text, adress), this.editRaven(adress)]);
  };
  // get на все локации, потом отбор на все, кроме текущей
  render() {
    if (this.state.location && this.state.raven) {
      return (
        <div className="container-fluid">
          <div className="row justify-content-center p-2">
            <button className="col-12 btn btn-outline-secondary mt-3" onClick={this.return}>
              Вернуться назад
            </button>
            <DropDownLocation
              ref={this.childRef}
              id={this.state.location}
              raven={this.state.raven}
            />
            <textarea
              className="form-control m-2"
              name="text"
              id="message"
              onChange={this.onInnputChange}
            />
            <button className="btn btn-outline-success mt-2" onClick={this.sendMessage} id="send">
              Отправить сообщение
            </button>
          </div>
        </div>
      );
    } else {
      return <Error />;
    }
  }
}

export default withRouter(EditMessage);
