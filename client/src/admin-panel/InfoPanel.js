import React from 'react';
import LocationList from '../location/LocationList';
import ErrorPage from '../ErrorPage';
import { withRouter } from '../withRouter';

// TO DO: при переходе по локации: список сообщений?(отдельно) список воронов в локации. Возможность добавит ворона,
// переход сообщений - все сообщения, отправленные в локацию
class InfoPanel extends React.Component {
  state = {
    admin: 0,
    locations: [{}],
    access: 0,
    url: '',
  };
  componentDidMount() {
    if (this.props.location.state) {
      if (this.props.location.state.url) {
        this.queryParams();
        this.getAllLocations();
      } else {
        this.setState({ access: 0 });
      }
    } else {
      this.props.navigate(`/`);
    }
  }

  getAllLocations = () => {
    fetch(`/location/admin/0/all`)
      .then(res => res.json())
      .then(locations => {
        this.setState({ locations });
      });
  };

  queryParams = () => {
    const url = this.props.location.state.url;
    // let key = this.props.params.locationId;

    if (url != null) {
      this.setState({ admin: 1, access: 1, url: url });
    } else {
      this.props.navigate(`/`);
    }
  };

  sendMessage = () => {
    this.props.navigate(`/location/admin/0/send`, {
      state: { admin: this.state.admin, url: this.state.url },
    });
  };

  addLocation = () => {
    this.props.navigate(`/location/admin/0/create`, {
      state: { admin: this.state.admin, url: this.state.url },
    });
  };

  render() {
    const admin = this.state.admin;
    const locations = this.state.locations;
    const url = this.props.location.pathname;
    const access = this.state.access;
    if (admin === 1 && access === 1) {
      return (
        <div className="container-fluid text-center">
          <button className="btn btn-primary m-2" onClick={this.addLocation}>
            Создать локацию
          </button>
          <button className="btn btn-primary m-2" onClick={this.sendMessage}>
            Отправить сообщение в замок
          </button>
          <LocationList url={url} locations={locations} />
        </div>
      );
    } else if (access === 0) {
      return (
        <div>
          <ErrorPage />
        </div>
      );
    }
  }
}

export default withRouter(InfoPanel);
