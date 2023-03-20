import React from 'react';
import { withRouter } from '../withRouter';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

// карточка ворона

class RavenCard extends React.Component {
  sendMessage = () => {
    this.props.navigate(`/location/send`, { state: { url: null } });
  };

  render() {
    return (
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>
              id: {this.props.ravenId}, {this.props.data}
            </Card.Title>
            <Button variant="primary" onClick={this.sendMessage}>
              Отправить ворона
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default withRouter(RavenCard);
