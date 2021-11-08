//import liraries
import React, { Component, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// create a component
const Detail = ({ route, navigation }) => {
  const { item } = route.params;

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

  const updateData = () => {
    var requestOptions = {
      method: 'PUT',
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

  const deleteData = () => {
    var myHeaders = new Headers();

    myHeaders.append(
      'Authorization',
      'Bearer 62ddfa7559d5fdec64517e3ab70ee4fd60b2244e71fa042a44f914f8fa688263'
    );

    myHeaders.append('Content-Type', 'application/json');

    fetch('https://gorest.co.in/public-api/users/' + item.id, {
      method: 'DELETE',
      headers: myHeaders,
      body: JSON.stringify({
        name: user.name,
        gender: user.gender,
        email: user.email,
        status: user.status,
      }),
    })
      .then((response) => {
        response.text();
        navigation.push('Get');
      })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={'Nombre'}
        onChangeText={(value) => onChangeNombre(value)}
        style={styles.input}
        value={user.nombre}
      />

      <TextInput
        placeholder={'Apellido'}
        onChangeText={(value) => onChangeApellido(value)}
        style={styles.input}
        value={user.apellido}
      />
      <TextInput
        placeholder={'Carnet'}
        onChangeText={(value) => onChangeCarnet(value)}
        style={styles.input}
        value={user.carnet}
      />
      <TextInput
        placeholder={'Edad'}
        onChangeText={(value) => onChangeEdad(value)}
        style={styles.input}
        value={user.edad}
      />

      <TextInput
        placeholder={'Direccion'}
        onChangeText={(value) => onChangeDireccion(value)}
        style={styles.input}
        value={user.direccion}
      />
      <TextInput
        placeholder={'Correo electronico'}
        onChangeText={(value) => onChangeCorreo(value)}
        style={styles.input}
        value={user.correo}
      />
      <TextInput
        placeholder={'Numero de telefono'}
        onChangeText={(value) => onChangeTelefono(value)}
        style={styles.input}
        value={user.telefono}
      />

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={updateData}>
          <View style={{ backgroundColor: '#09009B', padding: 10 }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>
              Actualizar
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={deleteData}>
          <View style={{ backgroundColor: 'red', padding: 10 }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>
              Eliminar
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    //backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
  },
});

//make this component available to the app
export default Detail;
