import React from 'react';
import { withRouter } from '../withRouter';

//Для мейстера, вороны и сообщения
// возможность отправить сообщение, переслать сообщение

class LocationCard extends React.Component {
  state = {
    key: 2,
    location: '',
    url: '',
  };

  componentDidMount() {
    const url = this.props.location.state?.url;
    if (url) {
      this.setState({ location: 'Добро пожаловать в воронятню' });
    } else {
      this.props.navigate(`/error`);
    }
  }

  onSendMessageClick = () => {
    const locationId = this.props.params.locationId;
    this.props.navigate(`/location/card/${locationId}/ravens`, {
      state: { locationId: locationId },
    });
  };

  checkMessageClick = () => {
    const locationId = this.props.params.locationId;
    this.props.navigate(`/location/card/${locationId}/messages`, {
      state: { locationId: locationId, url: this.props.location.state.url },
    });
  };
  // при монтировании компонента - запрос к бд по ключу =>
  // название локации, вороны, письма
  // queryParams = () => {
  //   const url = this.props.location.state.url;
  //   // let key = this.props.params.locationId;

  //   if (url != null) {
  //     this.setState({ location: 'Добро пожаловать в воронятню' });
  //   } else {
  //     this.props.navigate(`/error`);
  //   }
  // };
  render() {
    const { location } = this.state;
    const admin = this.props?.admin;
    const url = this.props?.pathname;

    if (admin && url) {
      return (
        <div className="col-12 col-md mt-2 mb-1">
          <div className="card border-dark">
            <div className="card-body">
              <h5 className="card-title">{this.props.name}</h5>

              <button
                className="btn btn-primary"
                onClick={() => {
                  this.props.navigate(`/admin/location/${this.props.id}`, {
                    state: { url: url, locationId: this.props.id, name: this.props.name },
                  });
                }}
              >
                Открыть
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container-fluid">
          <div className="row justify-content-center mt-2">
            <h5>{location}</h5>
            <button className="col-11 btn btn-outline-dark mt-2" onClick={this.onSendMessageClick}>
              Отправить ворона
            </button>
            <button className="col-11 btn btn-outline-dark mt-2" onClick={this.checkMessageClick}>
              Прочитать письма
            </button>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(LocationCard);
