import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Text,
  FlatList,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { v4 as uuid } from 'uuid';

export default function App() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [contacts, setContacts] = useState([]);
  const [countContact, setCountContact] = useState(0);
  const [error, setError] = useState(false);

  const handleChangeName = (name) => {
    setName(name);
  };

  const handleChangeNumber = (number) => {
    setNumber(number);
  };

  const addContact = () => {
    if (!name || !number) {
      setError(true);
      return;
    }

    setCountContact(countContact + 1);
    const contact = {
      id: countContact,
      name,
      number,
    };
    setContacts([...contacts, contact]);
    setName('');
    setNumber('');
    setError(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <Feather name='user' size={24} color='black' />
        <TextInput
          placeholder='Nome'
          style={styles.textInput}
          onChangeText={handleChangeName}
          value={name}
        />
      </View>
      <View style={styles.inputView}>
        <Feather
          style={styles.icon}
          name='smartphone'
          size={24}
          color='black'
        />
        <TextInput
          placeholder='Telefone'
          style={styles.textInput}
          onChangeText={handleChangeNumber}
          value={number}
        />
      </View>
      <View style={styles.inputButton}>
        {error && (
          <Text style={{ alignSelf: 'center', margin: 8, color: 'red' }}>
            Preencha todos os campos.
          </Text>
        )}
        <Button title='Adicionar Contato' onPress={addContact} />
      </View>
      <View style={{ width: '100%', alignSelf: 'center', marginTop: 16 }}>
        <FlatList
          data={contacts}
          renderItem={(contact) => (
            <View style={styles.item}>
              <Text style={styles.contact}>Nome: {contact.item.name}</Text>
              <Text style={styles.contact}>Número: {contact.item.number}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 50,
  },
  inputView: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  textInput: {
    width: '80%',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    marginBottom: 4,
    padding: 2,
    textAlign: 'center',
  },
  inputButton: {
    width: '100%',
  },
  item: {
    padding: 12,
    backgroundColor: '#e2edff',
    borderColor: '#CCC',
    borderWidth: 1,
    marginBottom: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  contact: {
    color: '#000',
    alignSelf: 'flex-start',
  },
});
