import React from 'react';
import { withRouter } from '../withRouter';
import Raven from './Raven';

class RavensList extends React.Component {
  state = {
    ravens: [],
  };
  ravens = [
    { locationId: 1, ravenId: 1, name: 'Sipliy' },
    { locationId: 1, ravenId: 2, name: 'Pusya' },
    { locationId: 2, ravenId: 3, name: 'ОЛЕГ' },
    { locationId: 3, ravenId: 3, name: 'Артемий' },
  ];

  componentDidMount() {
    this.ravensQuery();
  }
  ravensQuery = () => {
    const locationId = this.props.id;
    let actualRavens = [];
    this.ravens.forEach(item => {
      if (item.locationId === locationId) {
        let raven = {};
        raven['ravenId'] = item.ravenId;
        raven['name'] = item.name;
        raven['id'] = item.ravenId;
        actualRavens.push(raven);
        this.setState({ ravens: actualRavens });
      }
    });
  };

  render() {
    const ravens = this.state.ravens;

    return (
      <div>
        {ravens.map(item => (
          <Raven key={item.id} id={item.id} name={item.name} />
        ))}
        <button>Добавить ворона</button>
      </div>
    );
  }
}

export default withRouter(RavensList);
