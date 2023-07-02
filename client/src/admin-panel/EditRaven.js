import React from 'react';
import { withRouter } from '../withRouter';
import Error from '../Error';

class EditRaven extends React.Component {
  state = {
    id: 0,
    name: '',
    checked: false,
    weight: 0,
    newName: '',
    newHeght: 0,
    warning: '',
    saved: '',
  };

  componentDidMount() {
    const id = this.props.location.state?.id;
    const name = this.props.location.state?.name;
    const checked = this.props.location.state?.isWhite;
    const weight = this.props.location.state?.weight;
    this.setState({ id, name, checked, weight });
  }

  inputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleChange = e => {
    this.setState({ checked: e.target.checked });
  };

  editRaven = () => {
    const newName = this.state.newName;
    const name = this.state.name;
    const weight = +this.state.weight;
    const checked = this.state.checked;
    const id = this.state.id;
    if (newName.length > 0 && !newName.includes(name) && weight >= 0 && weight != null) {
      fetch(`/admin/edit/raven/${id}/edit`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ id, name: newName, weight, isWhite: checked }),
      }).then(() => {
        this.setState({ name: newName, warning: '', saved: 'Ворон сохранен' });
      });
    } else if (name.length > 0 && weight >= 0 && weight != null) {
      fetch(`/admin/edit/raven/${id}/edit`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ id, name, weight, isWhite: checked }),
      }).then(() => {
        this.setState({ name, warning: '', saved: 'Ворон сохранен' });
      });
    } else if (newName.length <= 0 && name.length <= 0) {
      this.setState({ warning: 'Введите имя ворона' });
    } else if ((newName.length > 0 || name.length > 0) && (weight < 0 || weight === null)) {
      this.setState({ warning: 'Введите корректный вес' });
    } else {
      this.setState({ warning: 'Заполните поля' });
    }
  };

  deleteRaven = () => {
    const id = this.state.id;
    fetch(`/admin/edit/raven/${id}/delete`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ id }),
    }).then(() => {
      this.props.navigate(-1);
    });
  };

  return = () => {
    this.props.navigate(`/admin/location/${this.props.location.state?.location}`, {
      state: {
        url: this.props.location.state?.path,
        locationId: this.props.location.state?.location,
        action: 1,
      },
    });
  };

  render() {
    const id = this.props.location.state?.id;
    const name = this.props.location.state?.name;

    if (id && name) {
      return (
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12">
              <button className="btn btn-outline-secondary mt-2" onClick={this.return}>
                Вернуться назад
              </button>
            </div>
            <div className="col-12 mt-2">
              <h5> Имя: {this.state.name}</h5>
              <h5>Вес: {this.state.weight}</h5>
              <p>{this.state.saved}</p>

              <p>{this.state.warning}</p>
              <input
                name="newName"
                className="form-control form-control-lg"
                placeholder="Новое имя ворона"
                onChange={this.inputChange}
              />
              <input
                name="weight"
                type="number"
                value={this.state.weight}
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

              <button className="col-12 btn btn-success mt-2" onClick={this.editRaven}>
                Сохранить
              </button>
              <button className="col-12 btn btn-danger mt-2" onClick={this.deleteRaven}>
                Удалить ворона
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

export default withRouter(EditRaven);
//добавление и редактирование ворона
