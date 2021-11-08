import React, { Component, useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
  Pressable,
  Picker,
  Button,
  FlatList,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
function App() {
  //Subida de archivos
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    console.log(result.uri);
    console.log(result);
  };
  ///--Codigo de prueba
  const [carre, setCarre] = useState();

  const renderItem1 = ({ item }) => {
    return (
      <TouchableOpacity>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            padding: 5,
          }}>
          <Text style={{ fontWeight: 'bold' }}>{item.nombre}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const getUniData = async () => {
    try {
      let response = await fetch(
        'https://rest-server-dps-api.herokuapp.com/api/careers?desde=0&limite=10'
      );
      let json = await response.json();
      setCarre(json.Careers);
    } catch (error) {
      console.error(error);
    }
  };

  useState(() => {
    getUniData();
  }, []);
  ///- Fin codigo de prueba

  //Array donde se almacena el json retornado
  const [uni, setUni] = useState();

  //Se utiliza para loguearse
  const LogeoAdmin = async (correo = '', password = '') => {
    var raw2 = { correo, password };
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify(raw2),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const tokenAuth = await fetch(
      'https://rest-server-dps-api.herokuapp.com/api/auth/login',
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => JSON.parse(result))
      .then((data) => data.token)
      .catch((error) => console.log('Error de login', error));
    return tokenAuth;
  };

  //johan@gmail.com
  //Sophia@gmail.com
  //Obtiene los datos
  const getData = async () => {
    const tokenUser = await LogeoAdmin('kellyNurse@gmail.com', 'pollo23');
    console.log(tokenUser);
    var requestOptions = {
      method: 'GET',
      headers: {
        'x-token': tokenUser,
      },
    };
    try {
      const resultado = await fetch(
        'https://rest-server-dps-api.herokuapp.com/api/scholars/log',
        requestOptions
      );
      let json = await resultado.json();
      setUni([json]);
      //setUni('hola');
      //console.log(json);
      console.log(uni);
      const result = json;
    } catch (error) {
      console.error(error);
    }
  };

  useState(() => {
    getData();
  }, []);

  const renderItem = ({ item }) => {
    //console.log(item);
    return (
      <View style={styles.header}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image style={styles.avatar} source={{ uri: item.img }} />

            <Text style={styles.name}>{item.nombre}</Text>
            <Text style={styles.userInfo}>{item.correo} </Text>
            <Text style={styles.userInfo}>{item.carnet} </Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.item}>
            <View style={styles.infoContent}>
              <Text style={styles.info}>
                Ingeniería en Ciencias de la Computación
              </Text>
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.infoContent}>
              <Text style={styles.info}>Edad: {item.edad}</Text>
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.infoContent}>
              <Text style={styles.info}>Dirección: {item.direccion}</Text>
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.infoContent}>
              <Text style={styles.info}>
                Fecha de nacimiento: {item.fechaDeNacimiento}
              </Text>
            </View>
          </View>

          <View style={styles.item}>
            <View style={styles.infoContent}>
              <Text style={styles.info}>Telefono: {item.telefono}</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#39A388',
              padding: 10,
              borderRadius: 5,
              marginTop: 5,
            }}>
            <TouchableOpacity>
              <Button
                title="Actualizar Avatar"
                color="#39A388"
                onPress={pickDocument}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text></Text>
      <FlatList
        data={uni}
        renderItem={renderItem}
        keyExtractor={(item) => item.uid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#DCDCDC',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignContent: 'center',
  },
  name: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
  },
  userInfo: {
    fontSize: 16,
    color: '#778899',
    fontWeight: 'bold',
  },
  body: {
    backgroundColor: '#000D6B',
    height: 500,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    alignItems: 'center',
  },
  iconContent: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    margin: 10,
    width: '50%',
  },
  buttonOpen: {
    backgroundColor: '#39A388',
    margin: 2,
    height: 50,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'sans-serif-condensed',
    fontSize: 18,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'sans-serif-condensed',
    fontSize: 18,
  },
});
export default App;
