import React from 'react';
import './index.css';
import './App.css';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers';
import BoardContainer from './containers/BoardContainer';

const store = createStore(todoApp);

render(
  <Provider store={store}>
    <BoardContainer />
  </Provider>,
  document.getElementById('root'),
);
