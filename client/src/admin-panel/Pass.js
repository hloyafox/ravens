import React from 'react';

class Pass extends React.Component {
  state = {
    pass: '',
    newPass: '',
    att: '',
  };

  inputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.newPass);
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

    if (!newPass.includes(pass)) {
      const id = this.props.id;
      fetch(`/admin/location/${id}/editpass`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ pass: newPass }),
      }).then(() => {
        this.getActualPass(id);
      });
    } else {
      this.setState({ att: 'Новый пароль совпадает с текущим' });
    }
  };

  render() {
    console.log(this.state.att);
    return (
      <div>
        <p>Изменить пароль от локации</p>
        <p>Текущй пароль: {this.state.pass}</p>
        <p>{this.state.att}</p>
        <input placeholder="Введите новый пароль" name="newPass" onChange={this.inputChange} />
        <button onClick={this.changePassword}>Изменить</button>
      </div>
    );
  }
}

export default Pass;
