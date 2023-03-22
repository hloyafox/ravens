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
      <div className="col-12 col-md mt-2 mb-1">
        <div className="card border-dark">
          <div className="card-title p-2">{this.props.name}</div>
          <div className="card-body">
            <button className="btn btn-outline-primary" onClick={this.editRaven}>
              Редактировать
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Raven);
