import React from "react";

const Context = React.createContext({});


export class Provider extends React.Component {
  state = { items: [], loading: true };

  methods = {
    sendMsg: (msg) => {
      const { items } = this.state;
      items.push(msg);
      this.setState({ items });
    }
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
