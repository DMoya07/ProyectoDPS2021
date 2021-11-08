import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import Loading from './components/loading';
import { vw, vh, vmin, vmax } from 'react-native-viewport-units';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/studentnavigation';
import { withRouter } from "react-router-dom";

export default function () {
  const [loadinState, setLoadinState] = useState(false);
  //DECLARACION DE ERROR
  const [usuarioError, setErrorUsuario] = useState('');
  const [contraError, setErrorContra] = useState('');
  var [Estado, setEstado] = useState('');
  const [logueo, setLogueo] = useState({
    usuario: '',
    contra: '',
    estado: ''
  });

  const onChangeUsuario = (value) => {
    setLogueo({ ...logueo, usuario: value });
  };

  const onChangeContra = (value) => {
    setLogueo({ ...logueo, contra: value });
  };

  const onChangeEstado = (value) => {
    setLogueo({ ...logueo, estado: value });
  };


  function handleClick() {
    if (
      logueo.usuario != 'kellyNurse@gmail.com' &&
      logueo.contra != 'pollo23'
    ) {
      console.log('falla');
      // poner en else if
      setErrorUsuario('Ingrese un usuario correcto.');
      setErrorContra('Ingrese una contraseña correcto.');
    } else if (
      logueo.usuario == 'kellyNurse@gmail.com' &&
      logueo.contra == 'pollo23'
    ) {
      history.push("/path/to/push");
    }
  }

  const load = () => {
    setTimeout(() => {
      setLoadinState(true);
    }, 4000);
  };

  if (logueo.estado == 'true') {
    return (
      <NavigationContainer>
        <Navigation></Navigation>
      </NavigationContainer>
    );
  } else {
    return (
      <>
        {load()}
        {!loadinState ? (
          <View style={styles.containerLoad}>
            <Loading />
          </View>
        ) : (
          <View style={styles.container}>
            <Text style={styles.texto}>Inicio de Sesión</Text>

            <TextInput
              placeholder={'Usuario'}
              style={styles.input}
              onChangeText={(value) => onChangeUsuario(value)}
            />
            <Text style={{ color: '#F82006' }}>{usuarioError}</Text>
            <TextInput
              onChangeText={(value) => onChangeContra(value)}
              placeholder={'Contraseña'}
              secureTextEntry={true}
              style={styles.input}
            />

            <Text style={{ color: '#F82006' }}>{contraError}</Text>

            <Button
              title={'Iniciar Sesión'}
              style={styles.input}
              onPress={handleClick}
            />
          </View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  containerLoad: {
    height: 100 * vh,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: 100 * vw,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    fontFamily: 'sans-serif-condensed',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    fontFamily: 'sans-serif-condensed',
  },

  texto: {
    marginBottom: 10,
    fontSize: 20,
    fontFamily: 'sans-serif-condensed',
  },
});
