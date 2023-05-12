import React from 'react';
import { withRouter } from '../withRouter';
import Raven from './Raven';

class RavensList extends React.Component {
  state = {
    ravens: [{}],
  };

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
      state: { location: locationId, url: this.props.url },
    });
  };

  render() {
    const ravens = this.state.ravens;

    return (
      <div>
        <div className="col mt-2">
          <button className="btn btn-primary" onClick={this.addRavenClick}>
            Добавить ворона
          </button>
        </div>
        <div className="row justify-content-center">
          {ravens.map((item, index) => (
            <Raven
              key={index + 1}
              id={item.id}
              name={item.name}
              location={this.props.id}
              url={this.props.url}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(RavensList);
