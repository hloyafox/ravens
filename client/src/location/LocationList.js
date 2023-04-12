import React from 'react';
import { withRouter } from '../withRouter';
import LocationCard from './LocationCard';
import Error from '../Error';

// для админа список локаций

class LocationList extends React.Component {
  render() {
    const pathname = this.props?.location.state.url;
    const locations = this.props.locations;
    if (pathname) {
      return (
        <div className="container-fluid">
          <div className="row">
            {locations.map((item, index) => (
              <LocationCard
                key={index + 1}
                admin={1}
                name={item.name}
                id={item.id}
                pathname={pathname}
              />
            ))}
          </div>
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

export default withRouter(LocationList);
