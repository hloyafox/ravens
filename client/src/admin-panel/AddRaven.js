import React from 'react';
import { withRouter } from '../withRouter';
import Error from '../Error';

class AddRaven extends React.Component {
  state = {
    name: '',
    location: this.props.location.state?.location,
    added: 0,
    warning: '',
  };

  inputChange = e => {
    this.setState({ [e.target.name]: e.target.value, added: 0 });
  };

  addNewRaven = () => {
    const locationId = this.props.location.state?.location;
    const name = this.state.name;
    if (name.length > 0) {
      fetch(`/admin/location/${locationId}/addRaven`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ name, location: locationId }),
      }).then(() => {
        this.setState({ added: 1, warning: '' });
        let input = document.getElementsByName('name')[0];
        input.value = '';
      });
    } else {
      this.setState({ warning: 'Введите имя ворона' });
    }
  };

  return = () => {
    this.props.navigate(`/admin/location/${this.state.location}`, {
      state: {
        url: this.props.location.state?.url,
        locationId: this.state.location,
        name: this.props.name,
        action: 1,
      },
    });
  };

  render() {
    const locationId = this.props.location.state?.location;

    if (locationId) {
      let added = this.state.added;
      let warning = this.state.warning;
      return (
        <div className="container-fluid text-center">
          <h3>Добавить ворона</h3>
          <input name="name" className="form-control" onChange={this.inputChange} />
          {added === 1 ? <p>Ворон добавлен</p> : null}
          {warning.length > 0 ? <p>Введите имя ворона</p> : null}

          <div className="row">
            <div className="col-12">
              <button className="btn btn-primary mt-2" onClick={this.addNewRaven}>
                Добавить
              </button>
            </div>
            <div className="col-12">
              <button className="btn btn-outline-secondary mt-2" onClick={this.return}>
                Назад
              </button>
            </div>
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

export default withRouter(AddRaven);
//добавление и редактирование ворона
