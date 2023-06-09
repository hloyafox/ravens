import React from 'react';
import RavenCard from './RavenCard';
import { withRouter } from '../withRouter';
import Row from 'react-bootstrap/Row';
import ErrorPage from '../ErrorPage';
class RavensList extends React.Component {
  state = {
    ravens: [],
  };

  componentDidMount() {
    this.ravensQuery();
  }

  componentDidUpdate() {
    const locationId = this.props.location.state?.locationId;
    let ravens = [];
    fetch(`/location/card/${locationId}/ravens/all`)
      .then(res => res.json())
      .then(data => {
        ravens.push(...data);
      })
      .then(() => {
        if (ravens.length !== this.state.ravens.length) {
          this.setState({ ravens });
        }
      });
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
    const locationId = this.props.location.state?.locationId;
    const url = this.props.location.state?.url;
    this.props.navigate(`/location/card/${locationId}`, { state: { url: url } });
  };

  render() {
    const ravens = this.state.ravens;
    const id = this.props.location.state?.locationId;

    if (id && ravens.length > 0) {
      return (
        <div className="container-fluid">
          <button className="col-12 btn btn-outline-secondary mt-3" onClick={this.return}>
            Главная страница
          </button>
          <Row xs={1} md={2} className="g-4 justify-content-center mt-2 mb-5">
            {ravens.map((item, index) => (
              <RavenCard
                key={index + 1}
                ravenId={item.id}
                name={item.name}
                locationId={this.props.location.state.locationId}
                isWhite={item.isWhite}
                weight={item.weight}
                url={this.props.location.state?.url}
              />
            ))}
          </Row>
        </div>
      );
    } else if (id && ravens.length <= 0) {
      return (
        <div className="container-fluid text-center mt-2">
          <button className="col-12 btn btn-outline-secondary mt-3" onClick={this.return}>
            Вернуться назад
          </button>
          <h3>В вашем замке нет воронов</h3>
        </div>
      );
    } else {
      return (
        <div>
          <ErrorPage />
        </div>
      );
    }
  }
}

export default withRouter(RavensList);
// список воронов в локации
// для админа - удаление и добавление воронов в локацию
