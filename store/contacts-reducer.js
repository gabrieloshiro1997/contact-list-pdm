import * as contactsActions from './contacts-actions';
import Contact from '../model/contact';

const initialState = {
  contacts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case contactsActions.ADD_CONTACT:
      const contact = new Contact(
        action.payload.id,
        action.payload.name,
        action.payload.phone
      );
      return {
        contacts: state.contacts.concat(contact),
      };
    default:
      return state;
  }
};
