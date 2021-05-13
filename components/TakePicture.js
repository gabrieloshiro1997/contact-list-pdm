import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../constants/Colors';

const TakePicture = (props) => {
  const [imageUri, setImageUri] = useState('');
  const takePicture = async () => {
    const picture = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      quality: 1,
    });

    setImageUri(picture.uri);
    props.onTakePicture(picture.uri);
  };
  return (
    <View style={styles.container}>
      <View style={styles.imagePreview}>
        {imageUri ? (
          <Image style={styles.image} source={{ uri: imageUri }} />
        ) : (
          <Text>Nenhuma foto.</Text>
        )}
      </View>
      <Button
        title='Selecionar Imagem'
        color={Colors.primary}
        onPress={takePicture}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderColor: '#CCC',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default TakePicture;
