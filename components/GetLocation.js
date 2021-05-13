import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';

const GetLocation = (props) => {
  const [loading, setLoading] = useState(false);
  const [locationSelected, setLocationSelected] = useState();
  const checkPermissions = async () => {
    const { status } = await Location.requestPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Sem permissão para uso do mecanismo de localização',
        'É preciso liberar acesso ao mecanismo de localização',
        [{ text: 'OK' }]
      );

      return false;
    }
    return true;
  };

  const getLocation = async () => {
    const hasPermission = await checkPermissions();
    if (hasPermission) {
      try {
        setLoading(true);
        let location = await Location.getCurrentPositionAsync({
          accuracy: 6,
        });

        setLocationSelected({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });

        props.onLocationSelected({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      } catch (error) {
        console.log(error);
        Alert.alert(
          'Impossível obter localização',
          'Tente novamente mais tarde ou escolha uma no mapa',
          [{ text: 'OK' }]
        );
      }

      setLoading(false);
    }
  };

  return (
    <View style={styles.getLocation}>
      {loading ? (
        <ActivityIndicator size='large' color={Colors.primary} />
      ) : locationSelected ? (
        <Text>
          Latitude: {locationSelected.lat} | Longitude: {locationSelected.lng}
        </Text>
      ) : (
        <Text>Nenhuma localização disponível</Text>
      )}
      <Button
        title='Obter localização'
        color={Colors.primary}
        onPress={() => getLocation()}
      />
    </View>
  );
};

export default GetLocation;

const styles = StyleSheet.create({
  getLocation: {
    marginBottom: 16,
  },
  mapPreview: {
    marginBottom: 12,
    width: '100%',
    borderColor: '#DDD',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  },
});
