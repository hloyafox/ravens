import React from 'react';
import { withRouter } from './withRouter';

class Error extends React.Component {
  render() {
    return <div> УПС</div>;
  }
}

export default withRouter(Error);
