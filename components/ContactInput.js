import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ContactInput = (props) => {
  return (
    <View style={styles.inputView}>
      <Feather name={props.icon} size={24} color='black' />
      <TextInput
        placeholder={props.placeholder}
        style={styles.textInput}
        onChangeText={props.handleChange}
        value={props.value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 16,
  },
  textInput: {
    width: '80%',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    marginBottom: 4,
    padding: 2,
    textAlign: 'center',
  },
});

export default ContactInput;
