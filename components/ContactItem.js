import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContactItem = (props) => {
  return (
    <View style={styles.item}>
      <Text style={styles.contact}>Nome: {props.contact.name}</Text>
      <Text style={styles.contact}>Número: {props.contact.number}</Text>
    </View>
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
