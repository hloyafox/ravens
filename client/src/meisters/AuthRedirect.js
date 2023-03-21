import React from 'react';
import Loading from './Loading';
import { withRouter } from '../withRouter';

class AuthRedirect extends React.Component {
  getLocationId = () => {
    let i = this.props.params;
    return i.locationId;
  };

  componentDidMount() {
    const name = window.location.href;
    console.log(name);
    this.navigateToLocation(name);
  }
  // locationId = взять айди из базы по ключу
  //
  navigateToLocation(url) {
    const j = this.getLocationId();
    console.log(j);
    if (url) {
      if (j === 'rrrrr') {
        const locationId = 1;
        this.props.navigate(`/location/card/${locationId}`, { state: { url: url, admin: 0 } });
      } else if (j === 'admin') {
        const locationId = 0;
        this.props.navigate(`/location/admin/${locationId}`, { state: { url: url, admin: 1 } });
      } else {
        const locationId = 15;
        this.props.navigate(`/location/card/${locationId}`, { state: { url: null } });
      }
    }
  }

  render() {
    return <Loading />;
  }
}

export default withRouter(AuthRedirect);
