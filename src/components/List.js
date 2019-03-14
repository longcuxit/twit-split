import React from 'react';

import { connect } from './Context';


class List extends React.Component {
  static defaultProps = {
    items: []
  }
  render() {
    const { items } = this.props;
    
    return (
      <ul className="c-list">
        {items.map((item, index) => {
          return (<li key={index}>{item}</li>)
        })}
      </ul>
    )
  }
}

export default connect(List);