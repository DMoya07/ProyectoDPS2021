//import liraries
import React, { Component, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Picker,
  Alert,
} from 'react-native';

//  dacreate a component
const Detail = ({ route, navigation }) => {
  //codigo para agregar select
  const [uni, setUni] = useState([]);
  const [carre, setCarre] = useState([]);
  const [cambio, setCambio] = useState();
  const [cambio1, setCambio1] = useState();

  //select universidad
  const getUniData = async () => {
    try {
      let response = await fetch(
        'https://rest-server-dps-api.herokuapp.com/Api/universities?desde=0&limite=10'
      );
      let json = await response.json();
      setUni(json.Universities);
    } catch (error) {
      console.error(error);
    }
  };

  let uniPicker = uni.map((data) => {
    return <Picker.Item label={data.nombre} value={data.uid} />;
  });

  //select carrera
  const getUniData1 = async () => {
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
  let uniPicker2 = carre.map((data) => {
    return <Picker.Item label={data.nombre} value={data.uid} />;
  });

  useState(() => {
    getUniData();
    getUniData1();
  }, []);
  //fin de codigo agregar select

  const { item } = route.params;

  const [user, setUser] = useState({
    nombre: item.nombre,
    apellido: item.apellido,
    carnet: item.carnet,
    fechaNacimiento: item.fechaNacimiento,
    edad: item.edad,
    direccion: item.direccion,
    correo: item.correo,
    telefono: item.telefono,
    idCarrera: item.idCarrera,
    idUniversidad: item.idUniversidad,
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

  const onChangeFecha = (value) => {
    setUser({ ...user, fechaNacimiento: value });
  };

  const onChangeCarrera = (value) => {
    setUser({ ...user, idCarrera: value });
  };

  const onChangeUniversidad = (value) => {
    setUser({ ...user, idUniversidad: value });
  };

  //se utiliza para loguearse
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
      .catch((error) => console.log('error', error));
    return tokenAuth;
  };

  //actualiza los datos
  const updateData = async (token = '', informacion = {}, uid) => {
    var requestOptions = {
      method: 'PUT',
      headers: {
        'x-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(informacion),
      redirect: 'follow',
    };

    const resultado = await fetch(
      'https://rest-server-dps-api.herokuapp.com/Api/scholars/' + item.uid,
      requestOptions
    )
      .then((response) => {
        response.text();
        navigation.push('Get');
      })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));

    return resultado;
  };

  const mainUpdate = async () => {
    const token = await LogeoAdmin('Kaguya65@hotmail.com', 'Pablito25');
    var updateEstudiante = {
      nombre: user.nombre,
      apellido: user.apellido,
      carnet: user.carnet,
      password: 'polloFrito54',
      edad: user.edad,
      fechaNacimiento: user.fechaNacimiento,
      direccion: user.direccion,
      correo: user.correo,
      telefono: user.telefono,
      IdCarrera: user.idCarrera,
      IdUniversidad: user.idUniversidad,
    };

    const result = updateData(token, updateEstudiante, item.uid);
  };

  const mainDelete = async () => {
    const token = await LogeoAdmin('Kaguya65@hotmail.com', 'Pablito25');
    const result = deleteData(token, item.uid);
  };

  //eliminar datos
  const deleteData = async (token = '', uid) => {
    var requestOptions = {
      method: 'DELETE',
      headers: {
        'x-token': token,
        'Content-Type': 'application/json',
      },
      //body:JSON.stringify(informacion),
      redirect: 'follow',
    };
    const resultado = await fetch(
      'https://rest-server-dps-api.herokuapp.com/Api/scholars/' + item.uid,
      requestOptions
    )
      .then((response) => {
        response.text();
        navigation.push('Get');
      })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
    return resultado;
  };

  //Alert update
  const UpdateButtonAlert = () =>
    Alert.alert('Actualizar Estudiante', '¿Desea actualizar este estudiante?', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Confirmar',
        onPress: mainUpdate,
      },
    ]);

  //Alert delete
  const DeleteButtonAlert = () =>
    Alert.alert('Eliminar Estudiante', '¿Desea eliminar este estudiante?', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Confirmar',
        onPress: mainDelete,
      },
    ]);

  return (
    <ScrollView>
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
          placeholder={'Fecha de nacimiento'}
          onChangeText={(value) => onChangeEdad(value)}
          style={styles.input}
          value={user.fechaNacimiento}
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

        <View>
          <Picker
            mode="dropdown"
            style={styles.input}
            selectedValue={cambio1}
            onValueChange={(itemValue) => {
              setCambio1(itemValue);
              onChangeCarrera(itemValue);
            }}>
            {uniPicker2}
          </Picker>
        </View>

        <View>
          <Picker
            mode="dropdown"
            style={styles.input}
            selectedValue={cambio}
            onValueChange={(itemValue) => {
              setCambio(itemValue);
              onChangeUniversidad(itemValue);
            }}>
            {uniPicker}
          </Picker>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={UpdateButtonAlert}>
            <View style={{ backgroundColor: '#09009B', padding: 10 }}>
              <Text style={{ color: 'white', textAlign: 'center' }}>
                Actualizar
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={DeleteButtonAlert}>
            <View style={{ backgroundColor: 'red', padding: 10 }}>
              <Text style={{ color: 'white', textAlign: 'center' }}>
                Eliminar
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
