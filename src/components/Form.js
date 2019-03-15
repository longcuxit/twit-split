import React from 'react';

import { splitMessage } from '../utils';
import { connect } from './Context';
import TextField from './TextField';

class Form extends React.Component {
  state = { msg: '', error: false, count: 0, length: 50 } //TODO: ENV_CONFIG

  onSubmit = (e) => {
    this.props.sendMsg(this.state.msg)
      .then(() => this.setState({ msg: '' }))
      .catch(e => this.setState({ error: e.message }))
    e.preventDefault();
  }

  setMsg = (msg) => this.setState(state => {
    try {
      const msgs = splitMessage.calculate(msg);
      const lastMsg = msgs[msgs.length -1];
      state.length = 50 - lastMsg.length;  //TODO: ENV_CONFIG
      state.count = msgs.length;
    } catch (e) {
      if (e.name === 'msg.wordsLonger') {
        state.error = e.message;
      } else {
        state.error = false;
        state.length = 0;
      }
    }
    state.msg = msg;
    return state;
  })

  render() {
    const { error, msg, length, count } = this.state;

    return (
      <form className="c-form" onSubmit={this.onSubmit}>
        {error && <div className="c-form_error">{error}</div>}
        <div className="c-form_counter">{length} ({count}) </div>
        <TextField
          label="Message:"
          value={msg}
          onChange={e => this.setMsg(e.target.value)}
          onKeyDown={e => {
            if (e.keyCode === 13 && !e.shiftKey) {
              const form = e.target.closest('form');
              return form && this.onSubmit(e);
            }
          }} />
          <button type="submit">➢</button>
      </form>
    )
  }
}

export default connect(Form);