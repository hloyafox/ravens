import React from 'react';
import { withRouter } from '../withRouter';
import ErrorPage from '../ErrorPage';

class EditRaven extends React.Component {
  state = {
    id: 0,
    name: '',
    weight: 0,
    newName: '',
    warning: '',
    saved: '',
  };

  componentDidMount() {
    const id = this.props.location.state?.ravenId;
    const name = this.props.location.state?.name;
    const weight = this.props.location.state?.weight;
    this.setState({ id, name, weight });
  }

  inputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  editRaven = () => {
    const newName = this.state.newName;
    const name = this.state.name;
    const id = this.state.id;
    if (newName.length > 0 && !newName.includes(name)) {
      fetch(`/location/raven/${id}/edit`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ id, name: newName }),
      }).then(() => {
        let input = document.getElementsByName('newName')[0];
        input.value = '';
        this.setState({ name: newName, warning: '', saved: 'Ворон сохранен' });
      });
    } else if (newName.length <= 0 || name.length <= 0) {
      this.setState({ warning: 'Введите имя ворона', saved: '' });
    } else {
      this.setState({ warning: 'Заполните поле', saved: '' });
    }
  };

  return = () => {
    this.props.navigate(`/location/card/${this.props.location.state?.locationId}/ravens`, {
      state: {
        url: this.props.location.state?.url,
        locationId: this.props.location.state?.locationId,
        action: 1,
      },
    });
  };

  render() {
    const id = this.props.location.state?.ravenId;
    const name = this.props.location.state?.name;
    if (id && name) {
      return (
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12">
              <button className="btn btn-outline-secondary mt-2" onClick={this.return}>
                Вернуться к клеткам
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
              <button className="col-12 btn btn-success mt-2" onClick={this.editRaven}>
                Сохранить
              </button>
            </div>
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

export default withRouter(EditRaven);
//добавление и редактирование ворона
