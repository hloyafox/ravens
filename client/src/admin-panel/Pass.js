import React from 'react';

class Pass extends React.Component {
  state = {
    pass: 'xyza',
    newPass: '',
    att: '',
  };

  inputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.newPass);
  };

  changePassword = () => {
    const newPass = this.state.newPass;
    const pass = this.state.pass;

    if (!newPass.includes(pass)) {
      this.setState({ pass: newPass, att: '' });
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
