import React from 'react';
import { useDispatch } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  Alert,
} from 'react-native';
import * as firebase from 'firebase';
import * as contactActions from '../store/contacts-actions';
import Colors from '../constants/Colors';

if (!firebase.apps.length) {
  firebase.initializeApp(ENV);
}

const db = firebase.firestore();
const ContactItem = (props) => {
  const dispatch = useDispatch();

  const removeContact = (id) => {
    console.log(id);
    Alert.alert('Remover', 'Remover contato?', [
      { text: 'Cancelar' },
      {
        text: 'Sim',
        onPress: () =>
          db
            .collection('lembretes')
            .doc(id)
            .delete()
            .then(() => {
              dispatch(contactActions.listContacts());
            }),
      },
    ]);
  };
  return (
    <TouchableNativeFeedback
      style={styles.item}
      onLongPress={() => removeContact(props.contact.id)}
    >
      <View style={styles.row}>
        <Image
          style={styles.image}
          source={{ uri: props.contact.imageUri }}
        ></Image>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{props.contact.name}</Text>
          <Text style={styles.phone}>{props.contact.phone}</Text>
          <Text style={styles.date}>Data: {props.contact.date}</Text>
          <Text style={styles.latLng}>Lat: {props.contact.lat}</Text>
          <Text style={styles.latLng}>Lng: {props.contact.lng}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  item: {
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#CCC',
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  infoContainer: {
    marginLeft: 24,
    width: 250,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  phone: {
    color: '#777',
    fontSize: 18,
  },
  name: {
    color: 'black',
    fontSize: 20,
    marginBottom: 2,
  },
  date: {
    fontSize: 14,
  },
  latLng: {
    fontSize: 14,
  },
});

export default ContactItem;
