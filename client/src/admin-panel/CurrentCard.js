import React from 'react';
import { withRouter } from '../withRouter';
import Pass from './Pass';
import RavensList from './RavensList';
import ErrorPage from '../ErrorPage';

// карточка (?)
class CurrentCard extends React.Component {
  state = {
    action: 0,
    locationId: 0,
  };

  componentDidMount() {
    const id = this.props.location.state?.locationId;
    const action = this.props.location.state?.action;
    if (action) {
      this.setState({ locationId: id, action });
    } else {
      this.setState({ locationId: id });
    }
  }

  addRavens = () => {
    this.setState({ action: 1 });
  };

  chandePassword = () => {
    this.setState({ action: 2 });
  };

  toMenu = () => {
    this.setState({ action: 0 });
  };

  return = () => {
    this.props.navigate(`/location/admin/0`, {
      state: {
        url: this.props.location.state?.url,
      },
    });
  };

  render() {
    const url = this.props.location.state?.url;
    const action = this.state.action;
    const name = this.props.location.state?.name;

    if (url) {
      if (action === 1) {
        return (
          <div className="container-fluid text-center">
            <button className="btn btn-outline-secondary mt-2" onClick={this.toMenu}>
              К редактированию локации
            </button>
            <RavensList id={this.state.locationId} url={url} />
          </div>
        );
      } else if (action === 2) {
        return (
          <div className="container-fluid text-center">
            <button className="btn btn-outline-secondary mt-2" onClick={this.toMenu}>
              К редактированию локации
            </button>
            <Pass id={this.state.locationId} name={name} />
          </div>
        );
      } else {
        return (
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <button className="btn btn-outline-dark m-2" onClick={this.return}>
                  К списку локаций
                </button>
              </div>
              <h5 className="m-2">Редактирование: {name}</h5>
              <button className="col btn btn-outline-dark m-2" onClick={this.addRavens}>
                Добавить/удалить воронов
              </button>
              <button className="col btn btn-outline-dark m-2" onClick={this.chandePassword}>
                Изменить пароль
              </button>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div>
          <ErrorPage />
        </div>
      );
    }
  }
}

export default withRouter(CurrentCard);
