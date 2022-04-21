import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'mobx-react';
import { itemsStore } from './stores/ItemsStore.js';
import { groceriesStore } from './stores/GroceriesStore.js';
import { firebaseStore } from './stores/FirebaseStore.js';

ReactDOM.render(
  <React.StrictMode>
    <Provider
      itemsStore={itemsStore}
      groceriesStore={groceriesStore}
      firebaseStore={firebaseStore}
    >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
