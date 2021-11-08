import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';

export default function Post() {
  const [user, setUser] = useState({
    nombre: '',
    apellido: '',
    carnet: '',
    edad: '',
    direccion: '',
    correo: '',
    telefono: '',
  });

  const [loading, setLoading] = useState(false);

  const onChangeNombre = (value) => {
    setUser({ ...user, nombre: value });
  };

  const onChangeApellido = (value) => {
    setUser({ ...user, apellido: value });
  };

  const onChangeCarnet = (value) => {
    setUser({ ...user, carnet: value });
  };

  const onChangeEdad = (value) => {
    setUser({ ...user, edad: value });
  };

  const onChangeDireccion = (value) => {
    setUser({ ...user, direccion: value });
  };

  const onChangeCorreo = (value) => {
    setUser({ ...user, correo: value });
  };

  const onChangeTelefono = (value) => {
    setUser({ ...user, telefono: value });
  };

  const saveData = () => {
    setLoading(true);
    //var myHeaders = new Headers();

    /*    myHeaders.append(
      'Authorization',
      'Bearer 62ddfa7559d5fdec64517e3ab70ee4fd60b2244e71fa042a44f914f8fa688263'
    );*/

    //myHeaders.append('Content-Type', 'application/json');
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        nombre: user.nombre,
        apellido: user.apellido,
        carnet: user.carnet,
        edad: user.edad,
        direccion: user.direccion,
        correo: user.correo,
        telefono: user.telefono,
      }),
      redirect: 'follow',
    };
    fetch(
      'https://rest-server-dps-api.herokuapp.com/Api/scholars',
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={'Nombre'}
        onChangeText={(value) => onChangeNombre(value)}
        style={styles.input}
      />

      <TextInput
        placeholder={'Apellido'}
        onChangeText={(value) => onChangeApellido(value)}
        style={styles.input}
      />
      <TextInput
        placeholder={'Carnet'}
        onChangeText={(value) => onChangeCarnet(value)}
        style={styles.input}
      />
      <TextInput
        placeholder={'Edad'}
        onChangeText={(value) => onChangeEdad(value)}
        style={styles.input}
      />

      <TextInput
        placeholder={'Direccion'}
        onChangeText={(value) => onChangeDireccion(value)}
        style={styles.input}
      />
      <TextInput
        placeholder={'Correo electronico'}
        onChangeText={(value) => onChangeCorreo(value)}
        style={styles.input}
      />
      <TextInput
        placeholder={'Numero de telefono'}
        onChangeText={(value) => onChangeTelefono(value)}
        style={styles.input}
      />

      <TouchableOpacity onPress={saveData}>
        <View style={{ backgroundColor: '#09009B', padding: 10 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>
            {loading ? 'Enviando...' : 'Enviar'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    margin: 15,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
  },
});
