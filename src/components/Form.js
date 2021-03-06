import React from 'react';

import { splitMessage } from '../utils';
import { connect } from './Context';
import TextField from './TextField';
import Transition from './Transition';

const LIMIT = parseInt(process.env.REACT_APP_MSG_LIMIT || 50);

class Form extends React.Component {
  state = { msg: '', error: false, count: 0, length: LIMIT }

  onSubmit = async (e) => {
    e.preventDefault();
    try {
      this.setState({ msg: '' });
      await this.props.sendMsg(this.state.msg);
    } catch (e) {
      this.setState({ error: e.message });
    }
  }

  setMsg = (msg) => this.setState(state => {
    try {
      const msgs = splitMessage(msg);
      const lastMsg = msgs[msgs.length -1];
      Object.assign(state, {
        length: LIMIT - lastMsg.length,
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
            <Transition  name='t-scalebot'>
              {error && (
                <div className="c-form_error">
                  <div className="c-form_error_msg">{error}</div>
                </div>
              )}
            </Transition>
            
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

export default connect(Form, ({ sendMsg }) => ({ sendMsg }));