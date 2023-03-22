import React from 'react';
import { withRouter } from '../withRouter';
import LocationCard from './LocationCard';

// для админа список локаций

class LocationList extends React.Component {
  render() {
    const pathname = this.props?.location.state.url;
    const locations = this.props.locations;
    if (pathname) {
      return locations.map((item, index) => (
        <LocationCard key={index + 1} admin={1} name={item.name} id={item.id} pathname={pathname} />
      ));
    } else {
      return <div>GO AWAY</div>;
    }
  }
}

export default withRouter(LocationList);
