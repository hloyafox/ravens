import React from 'react';
import { withRouter } from '../withRouter';

//Для мейстера, вороны и сообщения
// возможность отправить сообщение, переслать сообщение

class LocationCard extends React.Component {
  state = {
    key: 2,
    location: '',
    url: '',
  };

  componentDidMount() {
    if (this.props.location.state) {
      this.queryParams();
    } else {
      this.props.navigate(`/`);
    }
  }

  // при монтировании компонента - запрос к бд по ключу =>
  // название локации, вороны, письма
  queryParams = () => {
    const url = this.props.location.state.url;
    // let key = this.props.params.locationId;

    if (url != null) {
      this.setState({ location: 'Yes it is' });
    } else {
      this.setState({ location: 'Go away' });
    }
  };
  render() {
    const { location } = this.state;
    return <div>{location}</div>;
  }
}

export default withRouter(LocationCard);
