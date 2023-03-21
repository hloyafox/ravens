import React from 'react';
import { withRouter } from '../withRouter';

class EditRaven extends React.Component {
  state = {
    id: 0,
    name: '',
    newName: '',
  };

  componentDidMount() {
    const id = this.props.location.state.id;
    const name = this.props.location.state.name;
    this.setState({ id, name });
  }

  inputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.newName);
  };

  editRaven = () => {
    const newName = this.state.newName;
    this.setState({ name: newName });
  };

  render() {
    return (
      <div>
        Name: {this.state.name}
        <input name="newName" placeholder="Новое имя ворона" onChange={this.inputChange} />
        <button onClick={this.editRaven}>Save</button>
      </div>
    );
  }
}

export default withRouter(EditRaven);
//добавление и редактирование ворона
