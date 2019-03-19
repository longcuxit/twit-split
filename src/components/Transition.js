import React from 'react';
import ReactDom from 'react-dom';

class Single extends React.Component {

  static defaultProps = {
    delay: 0,
    onDestroy: Boolean
  }

  state = { run: false }
  checkChildren(current, next) {
    
    if (!this.state.runing && Boolean(current) !== Boolean(next)) {
      this.children = current || next;
      this.action = current?'hide':'show';
    }
  }

  cls = (ref) => ({
    add: (...cls) => cls.forEach((cl) => ref.classList.add(cl)),
    remove: (...cls) => cls.forEach((cl) => ref.classList.remove(cl))
  })

  get ref() {
    return ReactDom.findDOMNode(this);
  }

  once = (name, call) => {
    let handler, { ref } = this;
    ref.addEventListener(name, handler = () => {
      ref.removeEventListener(name, handler);
      call();
    });
  }

  timeout = (call, delay = 0) => {
    clearTimeout(this.timeout.id);
    return this.timeout.id = setTimeout(call, delay);
  }

  run(action) {
    const { delay = 0, name } = this.props;
    const { ref } = this, cls = this.cls(ref);
    const cl = name + '-' + action;

    cls.remove(name + '-enter', name + '-leave');
    cls.add(cl);
    return new Promise(next => {
      this.timeout(() => window.requestAnimationFrame(() => {
        this.once('transitionend', next);
        cls.add('run');
        this.state.runing =  true;
      }), delay + 50);
    })
  }

  show = () => this.run('enter').then(() => {
    if (!this.props.children) return this.hide();
    else this.setState({ runing: false });
  })

  hide = () => this.run('leave').then(() => {
    if (this.props.children) return this.show();
    else {
      this.children = false;
      this.setState({ runing: false });
      this.props.onDestroy();
    }
  })

  animate() {
    if (!this.action || !this.ref) return;
    this.action === 'show'? this.show():this.hide();
    this.action = false;
  }

  componentWillMount() {
    this.checkChildren(false, this.props.children);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.runing) return false;
    const { props } = this;
    this.checkChildren(this.children, nextProps.children);
    return true;
  }

  componentDidMount() {
    this.animate();
  }
  componentDidUpdate() {
    this.animate();
  }
  
  render() {
    return this.children || this.props.children;
  }
}

class Group extends React.Component {
  static defaultProps = {
    delay: 0,
    reverse: false,
    schedule: 100
  }

  children = [];
  childMap = {};
  newsIndex= {};
  removes = {};

  onDestroy(key) {

  }

  render() {
    const { children, schedule, reverse, delay, name } = this.props;
    let news = 0;
    const renders = [];
    
    children.forEach(child => {
      const exits = this.childMap[child.key];

      if (exits === undefined) {
        this.newsIndex[child.key] = news++;
      } else {
        delete this.children[exits];
      }
      renders.push(child);
    });

    this.children = children;
    this.childMap = {};
    
    return renders.map((child, index) => {
      const newsIndex = this.newsIndex[child.key];
      this.childMap[child.key] = index;
      if (newsIndex !== undefined) {
        const d = delay + (reverse?news - newsIndex:newsIndex) * schedule;
        return <Single key={child.key} delay={d} name={name}>{child}</Single>
      } else {
        return <Single key={child.key} delay={delay}>{child}</Single>
      }
    });
  }
}

export default (props) => {
  if (props.children && props.children.length) {
    return <Group {...props} />
  } else {
    return <Single {...props} />
  }
};