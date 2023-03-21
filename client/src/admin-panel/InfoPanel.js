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
  };
  componentDidMount() {
    if (this.props.location.state) {
      this.queryParams();
    } else {
      this.props.navigate(`/`);
    }
  }

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
    const url = this.props.location.pathname;
    if (admin === 1) {
      return (
        <div>
          <LocationList url={url} />
        </div>
      );
    }
  }
}

export default withRouter(InfoPanel);
