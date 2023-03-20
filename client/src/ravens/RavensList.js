import React from 'react';
import RavenCard from './RavenCard';
import { withRouter } from '../withRouter';
import Row from 'react-bootstrap/Row';
class RavensList extends React.Component {
  state = {
    ravens: [{}],
  };
  // отбор воронов по location id
  ravens = [
    { locationId: 1, ravenId: 1, name: 'Sipliy' },
    { locationId: 1, ravenId: 2, name: 'Pusya' },
    { locationId: 2, ravenId: 3, name: 'ОЛЕГ' },
  ];

  componentDidMount() {
    this.ravensQuery();
  }
  ravensQuery = () => {
    const locationId = +this.props.location.state.locationId;
    let actualRavens = [];
    this.ravens.forEach(item => {
      if (item.locationId === locationId) {
        let raven = {};
        raven['ravenId'] = item.ravenId;
        raven['name'] = item.name;
        actualRavens.push(raven);
        this.setState({ ravens: actualRavens });
      }
    });
  };

  render() {
    const ra = this.state.ravens;
    return (
      <Row xs={1} md={2} className="g-4">
        {ra.map((ra, index) => (
          <RavenCard
            key={index + 1}
            ravenId={ra.ravenId}
            name={ra.name}
            locationId={this.props.location.state.locationId}
          />
        ))}
      </Row>
    );
  }
}

export default withRouter(RavensList);
// список воронов в локации
// для админа - удаление и добавление воронов в локацию
