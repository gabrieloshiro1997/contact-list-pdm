import React, { useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import * as firebase from 'firebase';
import ContactInput from '../components/ContactInput';
import TakePicture from '../components/TakePicture';
import GetLocation from '../components/GetLocation';
import ENV from '../env';
import * as contactActions from '../store/contacts-actions';

if (!firebase.apps.length) {
  firebase.initializeApp(ENV);
}

const db = firebase.firestore();

export default function NewContact(props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [locationSelected, setLocationSelected] = useState();

  const dispatch = useDispatch();

  const [error, setError] = useState(false);

  const handleChangeName = (name) => {
    setName(name);
  };

  const handleChangePhone = (phone) => {
    setPhone(phone);
  };

  const addContact = () => {
    if (!name || !phone || !imageUri || !locationSelected) {
      setError(true);
      return;
    }
    const contact = {
      id: Math.random() * 100,
      name,
      phone,
      imageUri,
      lat: locationSelected.lat.lat,
      lng: locationSelected.lat.lng,
    };

    db.collection('lembretes').add(contact);

    setName('');
    setPhone('');
    setImageUri('');
    setLocationSelected(null);
    setError(false);
    dispatch(contactActions.listContacts());
    props.navigation.goBack();
  };

  const takePicture = (image) => {
    setImageUri(image);
  };

  const getLocation = (lat, lng) => {
    setLocationSelected({ lat, lng });
  };
  return (
    <View style={styles.container}>
      <ContactInput
        icon='user'
        placeholder='Nome'
        handleChange={handleChangeName}
        value={name}
      />
      <ContactInput
        icon='smartphone'
        placeholder='Telefone'
        handleChange={handleChangePhone}
        value={phone}
      />
      <View style={styles.inputButton}>
        {error && (
          <Text style={{ alignSelf: 'center', margin: 8, color: 'red' }}>
            Preencha todos os campos.
          </Text>
        )}
        <TakePicture onTakePicture={takePicture} />
        <GetLocation onLocationSelected={getLocation} />
        <Button title='Salvar' onPress={addContact} />
      </View>
    </View>
  );
}

NewContact.navigationOptions = () => {
  return {
    headerTitle: 'Adicionar contato',
  };
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 50,
  },
  inputButton: {
    width: '100%',
  },
});
