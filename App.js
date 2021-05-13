import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import contactReducer from './store/contacts-reducer';
import ContactsNavigation from './navigation/ContactsNavigation';
const rootReducer = combineReducers({
  contacts: contactReducer,
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <ContactsNavigation />
    </Provider>
  );
}
