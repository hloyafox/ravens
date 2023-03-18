import React from 'react';
import { withRouter } from '../withRouter';

//Для мейстера, вороны и сообщения
// возможность отправить сообщение, переслать сообщение

class LocationCard extends React.Component {
  state = {
    key: 2,
    location: '',
  };

  componentDidMount() {
    this.queryParams();
  }
  // при монтировании компонента - запрос к бд по ключу =>
  // название локации, вороны, письма
  queryParams = () => {
    let key = this.props.params.locationId;

    if (key === 'fghij') {
      this.setState({ location: 'ALPHOBET' });
    } else {
      this.setState({ location: 'Some shit' });
    }
  };
  render() {
    const { location } = this.state;

    return <div>{location}</div>;
  }
}

export default withRouter(LocationCard);
