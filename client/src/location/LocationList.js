import React from 'react';
import { withRouter } from '../withRouter';
import LocationCard from './LocationCard';

// для админа список локаций

class LocationList extends React.Component {
  locations = [
    { id: 1, name: 'Винтерфелл' },
    { id: 2, name: 'Дорн' },
    { id: 3, name: 'Речные земли' },
  ];

  render() {
    const pathname = this.props?.location.state.url;
    if (pathname) {
      return this.locations.map(item => (
        <LocationCard key={item.id} admin={1} name={item.name} id={item.id} pathname={pathname} />
      ));
    } else {
      return <div>GO AWAY</div>;
    }
  }
}

export default withRouter(LocationList);
