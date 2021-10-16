import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
export default function record() {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/work.png')} />

      <Text style={styles.texto}>
        Lo sentimos, estamos trabajando en la aplicación. Gracias por ser
        paciente. Estamos trabajando en la aplicación y volveremos en breve.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  texto: {
    fontFamily: 'sans-serif-condensed',
    margin: 10,
  },
});
