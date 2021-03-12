import React, { useState } from 'react';
import { Button, StyleSheet, View, Text, FlatList } from 'react-native';
import ContactItem from './components/ContactItem';
import ContactInput from './components/ContactInput';

export default function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [contacts, setContacts] = useState([]);
  const [countContact, setCountContact] = useState(0);
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

    setCountContact(countContact + 1);
    const contact = {
      id: countContact,
      name,
      phone,
    };
    setContacts([...contacts, contact]);
    setName('');
    setPhone('');
    setError(false);
  };

  const deleteContact = (keyDeleted) => {
    setContacts((currentContacts) => {
      return currentContacts.filter((contact) => {
        return contact.id !== keyDeleted;
      });
    });
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
        <Button title='Adicionar Contato' onPress={addContact} />
      </View>
      <View style={{ width: '100%', alignSelf: 'center', marginTop: 16 }}>
        <FlatList
          data={contacts}
          renderItem={(contact) => (
            <ContactItem
              deleteContact={deleteContact}
              keyToDelete={contact.item.id}
              contact={contact.item}
            />
          )}
          keyExtractor={(item, _) => item.id.toString()}
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
  inputButton: {
    width: '100%',
  },
});
