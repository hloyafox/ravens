import React from 'react';
import { withRouter } from '../withRouter';
import LocationCard from './LocationCard';
import ErrorPage from '../ErrorPage';

// для админа список локаций

class LocationList extends React.Component {
  render() {
    const pathname = this.props?.location.state.url;
    const locations = this.props.locations;
    if (pathname) {
      return (
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

export default withRouter(LocationList);
