import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';

const ContactItem = (props) => {
  return (
    <TouchableNativeFeedback
      delayPressIn={500}
      delayLongPress={0}
      onLongPress={() => props.deleteContact(props.keyToDelete)}
    >
      <View style={styles.item}>
        <Text style={styles.contact}>Nome: {props.contact.name}</Text>
        <Text style={styles.contact}>Telefone: {props.contact.phone}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
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

export default ContactItem;
