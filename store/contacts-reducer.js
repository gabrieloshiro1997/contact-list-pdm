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
        action.payload.phone,
        action.payload.imageUri,
        action.payload.lat,
        action.payload.lng,
        action.payload.date
      );
      return {
        contacts: state.contacts.concat(contact),
      };
    case contactsActions.LIST_CONTACTS:
      return {
        contacts: action.contacts.map(
          (contact) =>
            new Contact(
              contact.id.toString(),
              contact.name,
              contact.phone,
              contact.imageUri,
              contact.lat,
              contact.lng,
              contact.date
            )
        ),
      };
    default:
      return state;
  }
};
