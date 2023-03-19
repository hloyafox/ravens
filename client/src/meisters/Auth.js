import React from 'react';
import { withRouter } from '../withRouter';

class Auth extends React.Component {
  state = {
    key: '',
  };

  onInnputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onButtonEnterKey = key => {
    // Запрос к бд, сверка по ключу и роутинг на /location/card/key
    // если ключ админский - отрисовываем админскую страницу
    // если ключ локации - редирект на страницу локации/воронятни
    // если ключ не вырный - страница ошибки
    if (key === 'abcde') {
      this.props.navigate(`admin/${key}`);
    } else {
      this.props.navigate(`location/${key}`);
    }
  };

  render() {
    const { key } = this.state;
    return (
      <div className="auth">
        <input
          type="text"
          name="key"
          placeholder="Ключ от воронятни"
          onChange={this.onInnputChange}
        />
        <button
          onClick={() => {
            this.onButtonEnterKey(key);
          }}
        >
          Войти в воронятню
        </button>
      </div>
    );
  }
}

export default withRouter(Auth);
