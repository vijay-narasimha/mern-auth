import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import {createStore,compose,applyMiddleware} from 'redux'
import {reducer} from './helpers/reducer'
import thunk from 'redux-thunk'
const store=createStore(reducer,compose(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
   
  </React.StrictMode>
);
