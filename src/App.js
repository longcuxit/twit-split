import React, { Component } from 'react';

import { Provider } from './components/Context';
import List from './components/List';
import Form from './components/Form';

import './styles/all.scss';

class App extends Component {
  render() {
    return (
      <Provider>
        <div className="c-twitsplit">
          <List/>
          <Form/>
        </div>
      </Provider>
    );
  }
}

export default App;
