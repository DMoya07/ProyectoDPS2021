import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  Ionicons,
  StyleSheet,
  Pressable,
  Modal,
  ScrollView,
  Alert,
  FlatList,
  ImageBackground,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default function home(props) {
  const { navigation } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const LogeoStudent = async (correo = '', password = '') => {
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
        .catch((error) => console.log('error', error));
      return tokenAuth;
    };

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(date + '/' + month + '/' + year);
  }, []);
  return (
    <>
      <View
        style={{
          flexDirection: 'column',
          height: 710,
          justifyContent: 'space-between',
          backgroundColor: '#DCDCDC',
        }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Calendar />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View
          style={{
            borderRadius: 5,
            flex: 0.3,
            height: 350,
            alignItems: 'center',
            backgroundColor: '#DCDCDC',
          }}>
          {/*aqui*/}
          <Text
            style={{
              fontFamily: 'sans-serif-condensed',
              padding: 5,
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 35,
              color: 'black',
            }}>
            SAB
          </Text>
          <FontAwesome5 name="user" size={80} color="#000D6B" />
          <Text
            style={{
              fontFamily: 'sans-serif-condensed',
              fontSize: 25,
              padding: 5,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            Bienvenido
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontFamily: 'sans-serif-condensed',
                fontSize: 20,
                padding: 5,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Fecha:
            </Text>
            <Text
              style={{
                fontFamily: 'sans-serif-condensed',
                fontSize: 20,
                padding: 5,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              {currentDate}
            </Text>
          </View>
          {/*aqui*/}
        </View>
        <View
          style={[
            styles.container,
            {
              // Try setting `flexDirection` to `"row"`.
              flexDirection: 'column',
              height: 'auto',
              flex: 0.6,
              backgroundColor: '#000D6B',
              paddingTop: 25,
            },
          ]}>
          <View style={{ flex: 0.5 }}>
            <Text
              style={{
                fontFamily: 'sans-serif-condensed',
                padding: 3,
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 20,
                color: 'white',
              }}>
              Recordatorios
            </Text>
            <FlatList
              style={{ padding: 3 }}
              data={[
                { key: '• Entrega de documetos' },
                { key: '• Pagar mensualidad' },
                { key: '• Semana 11' },
                { key: '• Revisar Aula Virtual' },
              ]}
              renderItem={({ item }) => (
                <Text
                  style={{
                    fontFamily: 'sans-serif-condensed',
                    fontSize: 18,
                    color: 'white',
                    marginLeft: 110,
                  }}>
                  {item.key}
                </Text>
              )}
            />
          </View>
          <View style={{ flex: 0.6, alignItems: 'center' }}>
            <Text
              style={{
                padding: 5,
                textAlign: 'center',
                fontWeight: 'bold',
                fontFamily: 'sans-serif-condensed',
                fontSize: 20,
                color: 'white',
              }}>
              Calendario
            </Text>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.textStyle}>Mostrar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    height: 190,
    borderWidth: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    margin: 10,
    width: '50%',
  },
  button1: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    height: 60,
  },
  buttonOpen: {
    backgroundColor: '#39A388',
    margin: 2,
    height: 50,
  },
  buttonOpen1: {
    backgroundColor: '#F0A500',
    margin: 2,
  },
  buttonOpen2: {
    backgroundColor: '#00A19D',
    margin: 2,
  },
  buttonOpen3: {
    backgroundColor: '#6F69AC',
    margin: 2,
  },
  buttonOpen4: {
    backgroundColor: '#C37B89',
    margin: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'sans-serif-condensed',
    fontSize: 18,
  },
  textStyle1: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'sans-serif-condensed',
    fontSize: 20,
  },
  texto: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'sans-serif-condensed',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
