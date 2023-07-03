import React from 'react';
import { withRouter } from './withRouter';

class ErrorPage extends React.Component {
  render() {
    return (
      <div className="container-fluid text-center">
        <h2>Не стоит лезть в воронятню через окно, попробуйте войти через дверь</h2>
      </div>
    );
  }
}

export default withRouter(ErrorPage);
