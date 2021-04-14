import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import Home from './pages/Home';

import contactReducer from './store/contacts-reducer';

const rootReducer = combineReducers({
  contacts: contactReducer,
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
