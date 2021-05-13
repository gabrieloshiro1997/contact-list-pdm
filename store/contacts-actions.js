import * as FileSystem from 'expo-file-system';
import { insertContact, getContacts } from '../helpers/db';

export const ADD_CONTACT = 'ADD_CONTACT';
export const LIST_CONTACTS = 'LIST_CONTACTS';

export const listContacts = () => {
  return async (dispatch) => {
    try {
      const resultDB = await getContacts();
      dispatch({
        type: LIST_CONTACTS,
        contacts: resultDB.rows._array,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const addContact = ({ name, phone, imageUri, lat, lng }) => {
  return async (dispatch) => {
    const fileName = imageUri.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;
    try {
      await FileSystem.moveAsync({
        from: imageUri,
        to: newPath,
      });

      const resultDB = await insertContact(name, phone, newPath, lat, lng);
      console.log(resultDB);
      dispatch({
        type: ADD_CONTACT,
        payload: {
          id: resultDB.insertId,
          name,
          phone,
          imageUri,
          lat,
          lng,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
