import React from 'react';
import 'scroll-behaviour/polyfill';
import { connect } from './Context';


class List extends React.Component {
  static defaultProps = {
    items: []
  }
  cache = {
    last: null
  }

  onScroll = (e) => {
    if (e.target.scrollTop === 0 ) {
      this.props.fetchMoreItems();
    }
  }

  componentDidMount() {
    const { scroller } = this.refs;
    scroller.addEventListener('scroll', this.onScroll);
  }

  componentDidUpdate() {
    const { cache } = this, { items } = this.props;
    const last = items[items.length - 1]
    if (cache.last !== last) {
      cache.last = last;
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
          {items.map((item) => {
            return (
              <li key={item.id} className="c-list__item">
                <div className="msg">{item.message}</div>
              </li>
            );
          })}
        </ul>
      </section>
    )
  }
}

export default connect(List, ({ items, fetchMoreItems }) => ({ items, fetchMoreItems }));