import React from "react";

import { splitMessage, Api } from '../utils';

const Context = React.createContext({});


export class Provider extends React.Component {
  state = { items: [], loading: false };

  fetchMsg = async () => {
    this.setState({ loading: true })
    const msgs = await Api.getMsgs();
    this.setState(({ items }) => {
      items = items.concat(msgs);
      return { items, loading: false };
    });
    return msgs;
  }

  sendMsg = async (msg) => {
    msg = await Api.putMsg(msg);
    this.setState(({ items }) => {
      items.push(msg);
      return { items }
    });
  }

  sendMsgs = async (msgs) => {
    const msg = msgs.shift();
    if (msg) {
      await this.sendMsg(msg);
      return await this.sendMsgs(msgs);
    }
  }

  methods = {
    sendMsg: async (msg) => {
      const msgs = splitMessage(msg);
      this.setState({ loading: true });
      await this.sendMsgs(msgs);
      this.setState({ loading: false });
    }
  }

  get contextProps() {
    return { ...this.state, ...this.methods };
  }

  componentWillMount() {
    this.fetchMsg();
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
