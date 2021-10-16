import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import Loading from './components/Loading';
import { vw, vh, vmin, vmax } from 'react-native-viewport-units';
import { useHistory } from "react-router-dom";
import  { Redirect, Link } from 'react-router-dom'


export default function () {
  const [loadinState, setLoadinState] = useState(false);
  let history = useHistory();

  function handleClick() {
    return <Redirect to='./homeAdmin' />
  }

  const load = () => {
    setTimeout(() => {
      setLoadinState(true);
    }, 4000);
  };

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

          <TextInput placeholder={'Usuario'} style={styles.input} />
          <TextInput
            placeholder={'Contraseña'}
            secureTextEntry={true}
            style={styles.input}
          />

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
