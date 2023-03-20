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

  onSendMessageClick = () => {
    const locationId = this.props.params.locationId;
    this.props.navigate(`/location/card/${locationId}/ravens`, {
      state: { locationId: locationId },
    });
  };

  checkMessageClick = () => {
    const locationId = this.props.params.locationId;
    this.props.navigate(`/location/card/${locationId}/messages`, {
      state: { locationId: locationId },
    });
  };
  // при монтировании компонента - запрос к бд по ключу =>
  // название локации, вороны, письма
  queryParams = () => {
    const url = this.props.location.state.url;
    // let key = this.props.params.locationId;

    if (url != null) {
      this.setState({ location: 'Yes it is' });
    } else {
      this.props.navigate(`/`);
    }
  };
  render() {
    const { location } = this.state;
    return (
      <div>
        {location}
        <button onClick={this.onSendMessageClick}>Отправить ворона</button>
        <button onClick={this.checkMessageClick}>сообщения</button>
      </div>
    );
  }
}

export default withRouter(LocationCard);
