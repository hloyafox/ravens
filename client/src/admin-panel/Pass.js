import React from 'react';

class Pass extends React.Component {
  state = {
    pass: '',
    newPass: '',
    att: '',
  };

  inputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    const id = this.props.id;
    this.getActualPass(id);
  }

  getActualPass = id => {
    fetch(`/admin/location/${id}/pass`)
      .then(res => res.json())
      .then(data => {
        this.setState({ pass: data[0].pass });
      });
  };

  changePassword = () => {
    const newPass = this.state.newPass;
    const pass = this.state.pass;

    if (!newPass.includes(pass) && newPass.length > 0) {
      const id = this.props.id;
      fetch(`/admin/location/${id}/editpass`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ pass: newPass }),
      })
        .then(() => {
          this.getActualPass(id);
        })
        .then(response => {
          // Проверяем успешность запроса и выкидываем ошибку
          if (!response.ok) {
            throw new Error('Такой пароль уже существует!');
          }
        })
        .catch(error => {
          this.setState({ att: 'Такой пароль уже существует!' });
        });
    } else if (newPass.length <= 0) {
      this.setState({ att: 'Пароль не может быть пустым' });
    } else {
      this.setState({ att: 'Новый пароль совпадает с текущим' });
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col">
          <h5>Изменить пароль от локации {this.props.name}</h5>
          <h6>Текущй пароль: {this.state.pass}</h6>
          <p>{this.state.att}</p>
          <input
            className="form-control form-control-lg"
            placeholder="Введите новый пароль"
            name="newPass"
            onChange={this.inputChange}
          />
          <button className="btn btn-success mt-3" onClick={this.changePassword}>
            Изменить
          </button>
        </div>
      </div>
    );
  }
}

export default Pass;
