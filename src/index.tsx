import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { setupStore } from './store/store';
import './styles/fonts.scss'
import './styles/main.scss'
// import { store } from './store/store';

const store = setupStore();

ReactDOM.render(
  <Provider store = {store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);