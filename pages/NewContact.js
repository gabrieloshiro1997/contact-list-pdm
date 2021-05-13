import React, { useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import ContactInput from '../components/ContactInput';

import * as contactActions from '../store/contacts-actions';

export default function NewContact(props) {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(false);

  const handleChangeName = (name) => {
    setName(name);
  };

  const handleChangePhone = (phone) => {
    setPhone(phone);
  };

  const addContact = () => {
    if (!name || !phone) {
      setError(true);
      return;
    }

    const contact = {
      id: Math.random() * 100,
      name,
      phone,
    };
    console.log('contact', contact);
    dispatch(contactActions.addContact(contact));
    setName('');
    setPhone('');
    setError(false);
    props.navigation.goBack();
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
