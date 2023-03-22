import React from 'react';
import { withRouter } from '../withRouter';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

// карточка ворона

class RavenCard extends React.Component {
  sendMessage = () => {
    this.props.navigate(`/location/send/${this.props.ravenId}`, {
      state: { ravenId: this.props.ravenId, locationId: this.props.locationId },
    });
  };

  render() {
    return (
      <Col>
        <Card border="dark">
          <Card.Body>
            <Card.Title>{this.props.name}</Card.Title>
            <Button variant="outline-dark" onClick={this.sendMessage}>
              Отправить ворона
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default withRouter(RavenCard);
