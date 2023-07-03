import React from 'react';
import { withRouter } from '../withRouter';
import ErrorPage from '../ErrorPage';

class CreateLocation extends React.Component {
  constructor(props) {
    super(props);
    //creating ref
    this.childRef = React.createRef();
  }
  state = {
    name: '',
    pass: '',
    isAdmin: 0,
    url: '',
    admin: 0,
    warning: '',
    saved: '',
  };

  componentDidMount() {
    if (this.props.location.state) {
      if (this.props.location.state.admin === 1) {
        this.setState({
          admin: this.props.location.state.admin,
          url: this.props.location.state?.url,
        });
        // this.getAllLocations();
      }
    }
  }

  inputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  return = () => {
    this.props.navigate(`/location/admin/0`, {
      state: {
        url: this.state.url,
      },
    });
  };

  saveLocation = () => {
    let name = this.state.name;
    let pass = this.state.pass;
    let isAdmin = this.state.isAdmin;

    if (name.length > 0 && pass.length > 0) {
      fetch(`/admin/location/new/create`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ name, pass, isAdmin }),
      })
        .then(response => {
          // Проверяем успешность запроса и выкидываем ошибку
          if (!response.ok) {
            throw new Error('Такой пароль уже существует!');
          } else {
            let input = document.getElementsByName('name')[0];
            input.value = '';
            let weightInput = document.getElementsByName('pass')[0];
            weightInput.value = '';
            this.setState({ warning: '', saved: 'Локация добавлена' });
          }
        })
        .catch(error => {
          this.setState({ warning: 'Такой пароль уже существует!', saved: '' });
        });
    } else if (name.length <= 0) {
      this.setState({ warning: 'Введите название локации', saved: '' });
    } else if (pass.length <= 0) {
      this.setState({ warning: 'Введите пароль для локации', saved: '' });
    }
  };

  render() {
    let admin = this.state.admin;

    if (admin === 1) {
      return (
        <div className="container-fluid text-center mt-2">
          <div className="row justify-content-center p-2">
            <div className="col-12 m-2">
              <button className="btn btn-outline-dark m-2" onClick={this.return}>
                К списку локаций
              </button>
            </div>

            <div className="col-12 mt-2">
              <input
                name="name"
                className="form-control form-control-lg"
                placeholder="Название локации"
                onChange={this.inputChange}
              />
              <input
                name="pass"
                value={this.state.weight}
                className="form-control form-control-lg mt-2"
                placeholder="Пароль"
                onChange={this.inputChange}
              />
            </div>

            <p>{this.state.saved}</p>

            <p>{this.state.warning}</p>

            <button className="col-12 btn btn-success mt-2" onClick={this.saveLocation}>
              Сохранить
            </button>
          </div>
        </div>
      );
    } else {
      return <ErrorPage />;
    }
  }
}

export default withRouter(CreateLocation);
