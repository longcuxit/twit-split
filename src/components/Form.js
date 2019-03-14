import React from 'react';

import { connect } from './Context';

class Form extends React.Component {
  state = { msg: '', error: false }

  onSubmit = (e) => {
    this.props.sendMsg(this.state.msg)
      .then(() => {
        this.refs.input.value = '';
      })
      .catch(e => this.setState({ error: e.message }))
    e.preventDefault();
  }

  onTypeMsg = (e) => {
    const { state } = this;
    state.msg = e.target.value;
    state.error && this.setState({ error: false });
  }

  shouldComponentUpdate(props, state, a) {
    return state.error !== this.state.error;
  }

  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        {error && <div>{error}</div>}
        <input ref='input' onChange={this.onTypeMsg} multiple/>
      </form>
    )
  }
}

export default connect(Form);