import React from 'react';
import LocationList from '../location/LocationList';
import { withRouter } from '../withRouter';

// список мейстеров
// при переходе по мейстеру: поменять пароль, редактировать имя?

// список локаций
// при переходе по локации: список сообщений?(отдельно) список воронов в локации. Возможность добавит ворона,
// удалить ворона, отправить в другую локацию ворона
// переход сообщений - все сообщения, отправленные в локацию
class InfoPanel extends React.Component {
  state = {
    admin: 0,
    locations: [{}],
  };
  componentDidMount() {
    if (this.props.location.state) {
      this.queryParams();
      this.getAllLocations();
    } else {
      this.props.navigate(`/`);
    }
  }

  getAllLocations = () => {
    fetch(`/location/admin/0`)
      .then(res => res.json())
      .then(locations => {
        this.setState({ locations });
      });
  };

  queryParams = () => {
    const url = this.props.location.state.url;
    // let key = this.props.params.locationId;

    if (url != null) {
      this.setState({ admin: 1 });
    } else {
      this.props.navigate(`/`);
    }
  };

  render() {
    const admin = this.state.admin;
    const locations = this.state.locations;
    const url = this.props.location.pathname;
    if (admin === 1) {
      return (
        <div>
          <LocationList url={url} locations={locations} />
        </div>
      );
    }
  }
}

export default withRouter(InfoPanel);
