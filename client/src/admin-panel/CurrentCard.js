import React from 'react';
import { withRouter } from '../withRouter';
import Pass from './Pass';
import RavensList from './RavensList';

// карточка (?)
class CurrentCard extends React.Component {
  state = {
    action: 0,
    locationId: 0,
  };

  componentDidMount() {
    const id = this.props.location.state?.locationId;
    this.setState({ locationId: id });
  }

  addRavens = () => {
    this.setState({ action: 1 });
  };

  chandePassword = () => {
    this.setState({ action: 2 });
  };

  toMenu = () => {
    this.setState({ action: 0 });
  };

  render() {
    const url = this.props.location.state?.url;
    const action = this.state.action;

    if (url) {
      console.log(this.state.action);
      if (action === 1) {
        return (
          <div>
            <RavensList id={this.state.locationId} />
            <button onClick={this.toMenu}>Nazad</button>
          </div>
        );
      } else if (action === 2) {
        return (
          <div>
            <Pass id={this.state.locationId} />
            <button onClick={this.toMenu}>Nazad</button>
          </div>
        );
      } else {
        return (
          <div>
            Карточка для редактирования локации
            <button onClick={this.addRavens}> Добавить/удалить воронов </button>
            <button onClick={this.chandePassword}>Изменить пароль</button>
          </div>
        );
      }
    } else {
      return <div>GO AWAY</div>;
    }
  }
}

export default withRouter(CurrentCard);
