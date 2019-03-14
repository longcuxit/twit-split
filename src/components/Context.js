import React from "react";

import { splitMessage } from '../utils';

const Context = React.createContext({});


export class Provider extends React.Component {
  state = { items: [], loading: true };

  sendMsg = (msg) => new Promise((next, error) => {
    const { items } = this.state;
    items.push(msg);
    this.setState({ items });
    next();
  })

  sendMsgs = (msgs) => new Promise((next, error) => {
    const msg = msgs.shift();
    if (msg) {
      this.sendMsg(msg)
        .then(() => this.sendMsgs(msgs))
        .then(next)
        .catch(error)
    } else {
      next();
    }
  });

  methods = {
    sendMsg: (msg) => new Promise(next => this.sendMsgs(splitMessage(msg)).then(next))
  }

  get contextProps() {
    const { items } = this.state;
    return Object.assign({ items }, this.methods);
  }
  render() {
    return (
      <Context.Provider value={this.contextProps}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
export const connect = Component => props => (
  <Consumer>{context => <Component {...context} {...props} />}</Consumer>
);
export { Context };
export default { Provider, Consumer, Context, connect };
