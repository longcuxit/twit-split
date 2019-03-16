import React from "react";

import { splitMessage, Api } from '../utils';

const Context = React.createContext({});

export class Provider extends React.Component {
  state = { items: [], loading: false, moreItems: true, listError: false };

  fetchMsg = async () => {
    const { loading, moreItems } = this.state;
    if (loading || !moreItems) return;
    this.setState({ loading: true })
    try {
      const msgs = await Api.getMsgs();
      this.setState(({ items }) => {
        items = msgs.reverse().concat(items);
        return { items, loading: false, moreItems: !!msgs.length };
      });
      return msgs;
    } catch (e) {
      this.setState({ moreItems: false, loading: false, listError: e.message });
    }
  }

  sendMsg = async (msg) => {
    msg = await Api.putMsg(msg);
    this.setState(({ items }) => {
      return { items: [...items, msg ] }
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
      try {
        const msgs = splitMessage(msg);
        this.setState({ loading: true });
        await this.sendMsgs(msgs);
        this.setState({ loading: false });
      } catch (e) {
        this.setState({ loading: false });
        throw e;
      }
    },
    fetchMoreItems: this.fetchMsg
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

function equalState(objA, objB) {
  const keysA = Object.keys(objA), keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;
  return keysA.findIndex(k => objA[k] !== objB[k]) === -1;
}

export const Consumer = Context.Consumer;
export const connect = (Component, connect) => {

  connect = connect || ((context) => context);

  class Connect extends React.Component {
    requireUpdate = false;

    constructor(props) {
      super(props);
      this.state =  Object.assign({},connect(props.context),props.props);
    }

    componentWillReceiveProps(nextProps) {
      const { props, context } = nextProps;
      const newState = Object.assign({},connect(context),props);
      this.requireUpdate = !equalState(newState, this.state);
      if (this.requireUpdate) {
        Object.assign(this.state, newState);
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      return this.requireUpdate;
    }
    render(props) {
      return (
        <Component {...this.state} />
      )
    }
  }

  return (props) => (
    <Consumer>
      { context => (
        <Connect context={context} props={props}/>
      )}
    </Consumer>
  )
}
export { Context };
export default { Provider, Consumer, Context, connect };
