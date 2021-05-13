import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
} from 'react-native';

import Colors from '../constants/Colors';

const ContactItem = (props) => {
  return (
    <TouchableNativeFeedback style={styles.item}>
      <View style={styles.row}>
        <Image
          style={styles.image}
          source={{ uri: props.contact.imageUri }}
        ></Image>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{props.contact.name}</Text>
          <Text style={styles.phone}>{props.contact.phone}</Text>
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
    fontSize: 16,
  },
  name: {
    color: 'black',
    fontSize: 20,
    marginBottom: 2,
  },
  latLng: {
    fontSize: 16,
  },
});

export default ContactItem;
