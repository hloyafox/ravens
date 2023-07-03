import React from 'react';
import { withRouter } from '../withRouter';

class Auth extends React.Component {
  state = {
    key: '',
    name: '',
    isAdmin: 0,
  };

  onInnputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onButtonEnterKey = key => {
    if (key) {
      // Запрос к бд, сверка по ключу и роутинг на /location/card/key
      fetch(`location/${key}`)
        .then(res => res.json())
        .then(data => {
          data.map(el => this.setState({ isAdmin: el.isAdmin, name: el.name }));
        });

      // if (this.state.isAdmin === 1) {
      //   this.props.navigate(`/location/admin`, { state: { key: this.state.key } });
      // } else {
      this.props.navigate(`location/enter/${key}`, { state: { key: this.state.key } });
      // }
    } else {
      this.props.navigate(`/error`, { state: { url: null } });
    }
  };

  render() {
    const { key } = this.state;
    return (
      <div className="container-fluid">
        <div className="auth col mt-5 input-group">
          <input
            className="form-control"
            type="text"
            name="key"
            placeholder="Ключ от воронятни"
            onChange={this.onInnputChange}
          />
          <button
            className="btn btn-success btn-sm"
            onClick={() => {
              this.onButtonEnterKey(key);
            }}
          >
            Войти в воронятню
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Auth);
