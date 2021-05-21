import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import * as firebase from 'firebase';
import contactReducer from './store/contacts-reducer';
import ContactsNavigation from './navigation/ContactsNavigation';
// import { init } from './helpers/db';
import ENV from './env';

if (!firebase.apps.length) {
  firebase.initializeApp(ENV);
}

const rootReducer = combineReducers({
  contacts: contactReducer,
});
const store = createStore(rootReducer, applyMiddleware(reduxThunk));

// init()
//   .then(() => {
//     console.log('Criação da base ocorreu com sucesso');
//   })
//   .catch((err) => {
//     console.log('Criação da base falhou: ' + err);
//   });

export default function App() {
  return (
    <Provider store={store}>
      <ContactsNavigation />
    </Provider>
  );
}
