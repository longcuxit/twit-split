import React from 'react';

import { connect } from './Context';

import Transition from './Transition';

class Loading extends React.Component {
  render() {
    const { loading } = this.props;
    return (
      <Transition name="t-drop-top" className="c-loading">
        {loading && (
          <div className="c-loading_wrap">
            <div className="c-loading_icon"></div>
          </div>
        )}
      </Transition>
    );
  }
}

export default connect(Loading);