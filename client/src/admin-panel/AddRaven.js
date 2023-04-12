import React from 'react';
import { withRouter } from '../withRouter';
import Error from '../Error';

class AddRaven extends React.Component {
  state = {
    name: '',
    location: this.props.location.state?.location,
  };

  inputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addNewRaven = () => {
    const locationId = this.props.location.state?.location;
    const name = this.state.name;
    fetch(`/admin/location/${locationId}/addRaven`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ name, location: locationId }),
    }).then(() => {
      this.props.navigate(-1);
    });
  };

  render() {
    const locationId = this.props.location.state?.location;

    if (locationId) {
      return (
        <div>
          <h3>Добавить ворона</h3>
          <input name="name" onChange={this.inputChange} />
          <button onClick={this.addNewRaven}>Добавить</button>
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
