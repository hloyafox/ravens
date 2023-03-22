import React from 'react';
import { withRouter } from '../withRouter';

class EditRaven extends React.Component {
  state = {
    id: 0,
    name: '',
    newName: '',
  };

  componentDidMount() {
    const id = this.props.location.state?.id;
    const name = this.props.location.state?.name;
    this.setState({ id, name });
  }

  inputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  editRaven = () => {
    const newName = this.state.newName;
    const id = this.state.id;

    fetch(`/admin/edit/raven/${id}/edit`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ id, name: newName }),
    }).then(() => {
      this.setState({ name: newName });
    });
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

  render() {
    const id = this.props.location.state?.id;
    const name = this.props.location.state?.name;

    if (id && name) {
      return (
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col mt-2">
              <h5> Имя: {this.state.name}</h5>
              <input
                name="newName"
                className="form-control form-control-lg"
                placeholder="Новое имя ворона"
                onChange={this.inputChange}
              />

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
      return <div>GO AWAY</div>;
    }
  }
}

export default withRouter(EditRaven);
//добавление и редактирование ворона
