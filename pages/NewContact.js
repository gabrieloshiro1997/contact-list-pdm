import React, { useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import ContactInput from '../components/ContactInput';
import TakePicture from '../components/TakePicture';

import * as contactActions from '../store/contacts-actions';

export default function NewContact(props) {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [imageUri, setImageUri] = useState('');

  const [error, setError] = useState(false);

  const handleChangeName = (name) => {
    setName(name);
  };

  const handleChangePhone = (phone) => {
    setPhone(phone);
  };

  const addContact = () => {
    if (!name || !phone || !imageUri) {
      setError(true);
      return;
    }

    const contact = {
      id: Math.random() * 100,
      name,
      phone,
      imageUri,
    };
    dispatch(contactActions.addContact(contact));
    setName('');
    setPhone('');
    setImageUri('');
    setError(false);
    props.navigation.goBack();
  };

  const takePicture = (image) => {
    setImageUri(image);
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
