import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'mobx-react';
import { itemsStore } from './stores/ItemsStore.js';
import { groceriesStore } from './stores/GroceriesStore.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
firebase.initializeApp({
  apiKey: "AIzaSyB2vkwxX2wU0bneQSXLiYw8xsrPT7L5nQA",
  authDomain: "red-react-study.firebaseapp.com",
  databaseURL: "https://red-react-study-default-rtdb.firebaseio.com",
  projectId: "red-react-study",
  storageBucket: "red-react-study.appspot.com",
  messagingSenderId: "329885294282",
  appId: "1:329885294282:web:c9bb7fc67fcf96459a5e33"
});

ReactDOM.render(
  <React.StrictMode>
    <Provider
      itemsStore={itemsStore}
      groceriesStore={groceriesStore}
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
