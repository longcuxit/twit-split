import React from 'react';
import 'scroll-behaviour/polyfill';
import { connect } from './Context';


class List extends React.Component {
  static defaultProps = {
    items: []
  }
  cache = {
    itemCount: 0
  }
  componentDidUpdate() {
    const { cache } = this, { items } = this.props;
    if (cache.itemCount < items.length) {
      cache.itemCount = items.length;
      window.requestAnimationFrame(() => {
        const { scroller } = this.refs, endScroll = scroller.scrollHeight - scroller.offsetHeight;
        if (endScroll > scroller.scrollTop) {
          scroller.scrollTo({ top: endScroll, behavior: 'smooth' });
        }
      });
    }
  }

  render() {
    const { items } = this.props;
    
    return (
      <section ref="scroller" className="c-list">
        <ul className="c-list_items container">
          {items.map((item, index) => {
            return (
              <li key={index} className="c-list__item">
                <div className="msg">{item}</div>
              </li>
            );
          })}
        </ul>
      </section>
    )
  }
}

export default connect(List);