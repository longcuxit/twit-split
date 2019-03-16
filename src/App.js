import React, { Component } from 'react';

import { Provider } from './components/Context';
import List from './components/List';
import Form from './components/Form';

import './styles/all.scss';
import Loading from './components/Loading';

class App extends Component {
  render() {
    return (
      <Provider>
        <div className="c-twitsplit">
          <Loading />
          <List/>
          <Form/>
        </div>
      </Provider>
    );
  }
}

export default App;
