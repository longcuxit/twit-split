import React from 'react';

import { splitMessage } from '../utils';
import { connect } from './Context';
import TextField from './TextField';

class Form extends React.Component {
  state = { msg: '', error: false, count: 0, length: 50 } //TODO: ENV_CONFIG

  onSubmit = async (e) => {
    e.preventDefault();
    try {
      this.setState({ msg: '' });
      await this.props.sendMsg(this.state.msg);
    } catch (e) {
      this.setState({ error: e.message })
    }
  }

  setMsg = (msg) => this.setState(state => {
    try {
      const msgs = splitMessage.calculate(msg);
      const lastMsg = msgs[msgs.length -1];
      Object.assign(state, {
        length: 50 - lastMsg.length,  //TODO: ENV_CONFIG
        count: msgs.length,
        error: false
      })
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
      <div className="c-form">
        <div className="container">
          <form className="c-form_form row" onSubmit={this.onSubmit}>
            {error && <div className="c-form_error">{error}</div>}
            
            <TextField
              label="Message:"
              placeholder="Type your message"
              rows="1"
              value={msg}
              onChange={e => this.setMsg(e.target.value)}
              onKeyDown={e => {
                if (e.keyCode === 13 && !e.shiftKey) {
                  const form = e.target.closest('form');
                  return form && this.onSubmit(e);
                }
              }} />
              <button type="submit" className="c-form_send">
                <div className="c-form_counter">{length} ({count}) </div>
                <i>➢</i>
              </button>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(Form);