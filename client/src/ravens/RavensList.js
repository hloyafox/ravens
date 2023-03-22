import React from 'react';
import RavenCard from './RavenCard';
import { withRouter } from '../withRouter';
import Row from 'react-bootstrap/Row';
class RavensList extends React.Component {
  state = {
    ravens: [{}],
  };

  componentDidMount() {
    this.ravensQuery();
  }
  ravensQuery = () => {
    const locationId = this.props.location.state?.locationId;
    fetch(`/location/card/${locationId}/ravens`)
      .then(res => res.json())
      .then(ravens => {
        this.setState({ ravens });
      });
  };

  render() {
    const ravens = this.state.ravens;
    const id = this.props.location.state?.locationId;

    if (id) {
      return (
        <Row xs={1} md={2} className="g-4">
          {ravens.map((item, index) => (
            <RavenCard
              key={index + 1}
              ravenId={item.id}
              name={item.name}
              locationId={this.props.location.state.locationId}
            />
          ))}
        </Row>
      );
    } else {
      return <div>GO AWAY</div>;
    }
  }
}

export default withRouter(RavensList);
// список воронов в локации
// для админа - удаление и добавление воронов в локацию
