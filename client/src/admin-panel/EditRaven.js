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
    console.log(this.state.newName);
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
        <div>
          Name: {this.state.name}
          <input name="newName" placeholder="Новое имя ворона" onChange={this.inputChange} />
          <button onClick={this.editRaven}>Сохранить</button>
          <button onClick={this.deleteRaven}>Удалить ворона</button>
        </div>
      );
    } else {
      return <div>GO AWAY</div>;
    }
  }
}

export default withRouter(EditRaven);
//добавление и редактирование ворона
