import React from 'react';
import { withRouter } from '../withRouter';
import Raven from './Raven';

class RavensList extends React.Component {
  state = {
    ravens: [{}],
  };
  // ravens = [
  //   { locationId: 1, ravenId: 1, name: 'Sipliy' },
  //   { locationId: 1, ravenId: 2, name: 'Pusya' },
  //   { locationId: 2, ravenId: 3, name: 'ОЛЕГ' },
  //   { locationId: 3, ravenId: 3, name: 'Артемий' },
  // ];

  componentDidMount() {
    this.ravensQuery();
  }

  ravensQuery = () => {
    const locationId = this.props.id;
    fetch(`/admin/location/${locationId}/ravens`)
      .then(res => res.json())
      .then(ravens => {
        this.setState({ ravens });
      });
  };

  addRavenClick = () => {
    const locationId = this.props.id;
    this.props.navigate(`/admin/location/${locationId}/addRaven`, {
      state: { location: locationId },
    });
  };

  render() {
    const ravens = this.state.ravens;

    return (
      <div>
        {ravens.map(item => (
          <Raven key={item.id} id={item.id} name={item.name} location={this.props.id} />
        ))}
        <button onClick={this.addRavenClick}>Добавить ворона</button>
      </div>
    );
  }
}

export default withRouter(RavensList);
