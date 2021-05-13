import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ContactItem from '../components/ContactItem';
import CustomHeaderButton from '../components/CustomHeaderButton';
import * as contactActions from '../store/contacts-actions';

export default function Contacts() {
  const contacts = useSelector((state) => state.contacts.contacts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(contactActions.listContacts());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={(contact) => (
          <ContactItem style={styles.item} contact={contact.item} />
        )}
        keyExtractor={(item, _) => item.id.toString()}
      />
    </View>
  );
}

Contacts.navigationOptions = (dadosNav) => {
  return {
    headerTitle: 'Todos os contatos',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Adicionar'
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => dadosNav.navigation.navigate('NewContact')}
        />
      </HeaderButtons>
    ),
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
  item: {
    paddingBottom: 30,
  },
});
