export const ADD_CONTACT = 'ADD_CONTACT';

export const addContact = ({ id, name, phone }) => {
  return {
    type: ADD_CONTACT,
    payload: { id, name, phone },
  };
};
