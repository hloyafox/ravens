import React from 'react';
import RavenCard from './RavenCard';
import { withRouter } from '../withRouter';
import Row from 'react-bootstrap/Row';
import Error from '../Error';
class RavensList extends React.Component {
  state = {
    ravens: [],
  };

  componentDidMount() {
    this.ravensQuery();
  }
  ravensQuery = () => {
    const locationId = this.props.location.state?.locationId;
    fetch(`/location/card/${locationId}/ravens/all`)
      .then(res => res.json())
      .then(ravens => {
        this.setState({ ravens });
      });
  };

  return = () => {
    this.props.navigate(-1);
  };

  render() {
    const ravens = this.state.ravens;
    const id = this.props.location.state?.locationId;

    if (id && ravens.length > 0) {
      return (
        <div className="container-fluid">
          <Row xs={1} md={2} className="g-4 justify-content-center mt-2">
            {ravens.map((item, index) => (
              <RavenCard
                key={index + 1}
                ravenId={item.id}
                name={item.name}
                locationId={this.props.location.state.locationId}
              />
            ))}
          </Row>
          <button className="col-12 btn btn-outline-secondary mt-3" onClick={this.return}>
            Вернуться назад
          </button>
        </div>
      );
    } else if (id && ravens.length <= 0) {
      return (
        <div className="container-fluid text-center mt-2">
          <h3>В вашем замке нет воронов</h3>

          <button className="col-12 btn btn-outline-secondary mt-3" onClick={this.return}>
            Вернуться назад
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <Error />
        </div>
      );
    }
  }
}

export default withRouter(RavensList);
// список воронов в локации
// для админа - удаление и добавление воронов в локацию
