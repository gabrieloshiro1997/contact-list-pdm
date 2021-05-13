import React, { useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import ContactInput from '../components/ContactInput';
import TakePicture from '../components/TakePicture';
import GetLocation from '../components/GetLocation';

import * as contactActions from '../store/contacts-actions';

export default function NewContact(props) {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [locationSelected, setLocationSelected] = useState();

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
    dispatch(contactActions.addContact(contact));
    setName('');
    setPhone('');
    setImageUri('');
    setLocationSelected(null);
    setError(false);
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
