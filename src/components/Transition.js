import React from 'react';
import ReactDOM from 'react-dom';
import { stylePrefix } from '../utils';

class Transition extends React.Component {
  
  once(element, name, call) {
    const handle = (e) => {
      element.removeEventListener(name, handle);
      call.call(element, e);
    }
    element.addEventListener(name, handle);
  }

  run = () => {
    const element = ReactDOM.findDOMNode(this);
    if (!element) return
    this.once(element, stylePrefix('transitionend'), (e) => this.forceUpdate());
    element.classList.add('run');
  }

  show() {
    const { props } = this;
    this.lastChilren = props.children;
    window.requestAnimationFrame(this.run);
    return this.wrap({
      ...props,
      className: (props.className || '') + ` ${props.name} enter`
    });
  }

  hide() {
    const { lastChilren, props } = this;
    delete this.lastChilren;
    window.requestAnimationFrame(this.run);
    return this.wrap({
      ...props,
      children: lastChilren,
      className: (props.className || '') + ` ${props.name} leave`
    });
  }

  wrap(props) {
    if (!props.children) return false;
    const { as = 'div' } = props;
    return React.createElement(as, props);
  }

  render() {
    const { children } = this.props;
    if (this.lastChilren) {
      if (!children) {
        return this.hide();
      }
    } else {
      if (children) {
        return this.show();
      }
    }

    this.lastChilren = children;
    return this.wrap(this.props);
  }
}

export default Transition;