import React from 'react';

import { connect } from './Context';

class Form extends React.Component {
  state = { msg: ''}

  onSubmit = (e) => {
    this.props.sendMsg(this.state.msg)
    e.preventDefault();
    return false;
  }

  onTypeMsg = (e) => {
    console.log(e.target.value)
    const { state } = this;
    state.msg = e.target.value;
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input onChange={this.onTypeMsg}/>
      </form>
    )
  }
}

export default connect(Form);