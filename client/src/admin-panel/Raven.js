import React from 'react';
import { withRouter } from '../withRouter';

class Raven extends React.Component {
  editRaven = () => {
    const url = this.props.location.pathname;
    this.props.navigate(`/admin/edit/raven/${this.props.id}`, {
      state: { url: url, name: this.props.name, id: this.props.id },
    });
  };

  render() {
    return (
      <div>
        {this.props.id} {this.props.name}
        <button onClick={this.editRaven}>Редактировать</button>
      </div>
    );
  }
}

export default withRouter(Raven);
