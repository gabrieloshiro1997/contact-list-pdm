import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import contactReducer from './store/contacts-reducer';
import ContactsNavigation from './navigation/ContactsNavigation';
import { init } from './helpers/db';

const rootReducer = combineReducers({
  contacts: contactReducer,
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

init()
  .then(() => {
    console.log('Criação da base ocorreu com sucesso');
  })
  .catch((err) => {
    console.log('Criação da base falhou: ' + err);
  });

export default function App() {
  return (
    <Provider store={store}>
      <ContactsNavigation />
    </Provider>
  );
}
