import * as FileSystem from 'expo-file-system';
import { insertContact, getContacts } from '../helpers/db';
import * as firebase from 'firebase';
import ENV from '../env';

export const ADD_CONTACT = 'ADD_CONTACT';
export const LIST_CONTACTS = 'LIST_CONTACTS';

if (!firebase.apps.length) {
  firebase.initializeApp(ENV);
}

const db = firebase.firestore();

export const listContacts = () => {
  return async (dispatch) => {
    try {
      const snapshot = await firebase.firestore().collection('lembretes').get();
      const aux = snapshot.docs.map((doc) => ({
        id: doc.id,
        imageUri: doc.data().imageUri,
        lat: doc.data().lat,
        lng: doc.data().lng,
        name: doc.data().name,
        phone: doc.data().phone,
      }));

      dispatch({
        type: LIST_CONTACTS,
        contacts: aux,
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

      // const resultDB = await insertContact(name, phone, newPath, lat, lng);
      // console.log('resultDB.date', resultDB.date);
      db.collection('lembretes').add({
        name,
        phone,
        imageUri,
        lat,
        lng,
        date: resultDB.date,
      });
      dispatch({
        type: ADD_CONTACT,
        payload: {
          id: resultDB.insertId,
          name,
          phone,
          imageUri,
          lat,
          lng,
          date: resultDB.date,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
