import React from 'react';
import Loading from './Loading';
import { withRouter } from '../withRouter';

class AuthRedirect extends React.Component {
  state = {
    isAdmin: 0,
    id: 0,
  };
  // getLocationPass = () => {
  //   let i = this.props.location.state.key;
  //   console.log('i', i);
  //   return i.locationId;
  // };

  componentDidMount() {
    const pass = this.props.location.state.key;
    console.log('pass', pass);
    fetch(`/location/${pass}`)
      .then(res => res.json())
      .then(data => {
        data.map(el => this.setState({ isAdmin: el.isAdmin, id: el.id }));
      });
  }

  componentDidUpdate() {
    const name = window.location.href;
    this.navigateToLocation(name);
  }
  // locationId = взять айди из базы по ключу
  //
  navigateToLocation(url) {
    if (url) {
      const admin = this.state.isAdmin;
      const id = this.state.id;

      if (admin === 0) {
        this.props.navigate(`/location/card/${id}`, { state: { url: url, admin: 0 } });
      } else if (admin === 1) {
        const locationId = 0;
        this.props.navigate(`/location/admin/${locationId}`, { state: { url: url, admin: 1 } });
      } else {
        this.props.navigate(`/error`, { state: { url: null } });
      }
    }
  }

  render() {
    console.log(this.state);

    return <Loading />;
  }
}

export default withRouter(AuthRedirect);
