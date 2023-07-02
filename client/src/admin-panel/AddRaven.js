import React from 'react';
import { withRouter } from '../withRouter';
import Error from '../Error';

class AddRaven extends React.Component {
  state = {
    name: '',
    location: this.props.location.state?.location,
    added: 0,
    warning: '',
    weight: 0,
    checked: false,
  };

  inputChange = e => {
    this.setState({ [e.target.name]: e.target.value, added: 0 });
  };

  handleChange = e => {
    this.setState({ checked: e.target.checked });
  };

  addNewRaven = () => {
    const locationId = this.props.location.state?.location;
    const name = this.state.name;
    const weight = +this.state.weight;
    const checked = this.state.checked;
    if (name.length > 0 && weight > 0) {
      fetch(`/admin/location/${locationId}/addRaven`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ name, weight, location: locationId, isWhite: checked }),
      }).then(() => {
        this.setState({ added: 1, warning: '' });
        let input = document.getElementsByName('name')[0];
        input.value = '';
        let weightInput = document.getElementsByName('weight')[0];
        weightInput.value = '';
      });
    } else if (name.length <= 0 && weight > 0) {
      this.setState({ warning: 'Введите имя ворона' });
    } else if (weight <= 0 && name.length > 0) {
      this.setState({ warning: 'Введите вес' });
    } else {
      this.setState({ warning: 'Заполните поля' });
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
          {added === 1 ? <p>Ворон добавлен</p> : null}
          {warning.length > 0 ? <p>{this.state.warning}</p> : null}

          <input
            name="name"
            className="form-control mt-2"
            placeholder="Введите имя"
            onChange={this.inputChange}
          />
          <input
            name="weight"
            type="number"
            className="form-control mt-2"
            placeholder="Введите вес (число символов)"
            onChange={this.inputChange}
          />
          <div>
            <input
              className="me-2"
              type="checkbox"
              checked={this.state.checked}
              onChange={this.handleChange}
            />
            <span>Белый ворон</span>
          </div>

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
