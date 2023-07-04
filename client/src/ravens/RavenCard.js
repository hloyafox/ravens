import React from 'react';
import { withRouter } from '../withRouter';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import White from '../image/White';
import Black from '../image/Black';

// карточка ворона

class RavenCard extends React.Component {
  sendMessage = () => {
    this.props.navigate(`/location/send/${this.props.ravenId}`, {
      state: {
        ravenId: this.props.ravenId,
        locationId: this.props.locationId,
        weight: this.props.weight,
        isWhite: this.props.isWhite,
      },
    });
  };

  renameRaven = () => {
    this.props.navigate(`/location/raven/${this.props.ravenId}/rename`, {
      state: {
        ravenId: this.props.ravenId,
        locationId: this.props.locationId,
        weight: this.props.weight,
        isWhite: this.props.isWhite,
        name: this.props.name,
        url: this.props.url,
      },
    });
  };

  render() {
    return (
      <Col>
        <Card border="dark">
          <Card.Body>
            <Card.Title>{this.props.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Вес: {this.props.weight}</Card.Subtitle>
            {this.props.isWhite === 1 ? <White /> : <Black />}

            <Button variant="outline-dark" onClick={this.sendMessage}>
              Отправить ворона
            </Button>
            <Button className="mt-2" variant="outline-dark" onClick={this.renameRaven}>
              Изменить имя
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default withRouter(RavenCard);
