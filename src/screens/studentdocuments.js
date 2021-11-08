import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
  FlatList,
} from 'react-native';
import Constants from 'expo-constants';
import * as DocumentPicker from 'expo-document-picker';

export default function Post({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [singleFile, setSingleFile] = useState(null);

  const updateData = async (input_nombredoc = '') => {
    // Verifica si hay archivo seleccionado o no
    if (singleFile != null) {
      /* Si hay seleccionado obtenemos el token, el nombre del doc y 
      creamos el archivo a subir*/
      const tokenUser = await LogeoAdmin('kellyNurse@gmail.com', 'pollo23');
      const nombreDocumento = input_nombredoc;
      const fileToUpload = singleFile;
      const data = new FormData();
      data.append('archivo', fileToUpload);
      // Colocamos nuestra api
      let res = await fetch(
        'https://rest-server-dps-api.herokuapp.com/api/uploads/' +
          nombreDocumento,
        {
          method: 'PUT',
          headers: {
            'x-token': tokenUser,
            'Content-Type': 'application/json',
          },
        }
      );
      let responseJson = await res.json();
      if (responseJson.status == 1) {
        alert('Subida Exitosa');
      }
    } else {
      // If no file selected the show alert
      alert('Falló la subida, intentelo nuevamente');
    }
  };

  //Selector de archivos
  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  //-----CODIGO PARA SUBIR ARCHIVO
  const pickDocument = async (input_nombredoc = '') => {
    //Selector de archivos
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });
    this.setState({ singleFile: res });

    //Creando formdata
    const data = new FormData();
    data.append('archivo', res);

    //Obtengo el nombre para el switchcase
    const nombreDocumento = input_nombredoc;
    const tokenUser = await LogeoAdmin('kellyNurse@gmail.com', 'pollo23');
    //parseamos los datos para el body del put

    //console.log(formData.getAll(input_nombredoc))
    //Mandamos todos los parametros al update data
    updateData(tokenUser, input_nombredoc, uri_documento);
  };

  //----Fin codigo subir archivo

  //boton de logueo
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingrese la URL de los documentos</Text>

      <View
        style={{
          backgroundColor: '#F0A500',
          padding: 10,
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
        }}>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={selectFile}>
          <Text
            style={{
              alignSelf: 'center',
              color: '#ffff',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Seleccione el archivo
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: '#F0A500',
          paddingBottom: 10,
          borderBottomRightRadius: 5,
          borderBottomLeftRadius: 5,
        }}>
        <TouchableOpacity>
          <Button
            title="Subir Colector de Notas"
            color="#F0A500"
            value="Colector de Notas"
            onPress={(value) => pickDocument('colectorNotas')}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: '#00A19D',
          padding: 10,
          marginTop: 5,
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
        }}>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={selectFile}>
          <Text
            style={{
              alignSelf: 'center',
              color: '#ffff',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Seleccione el archivo
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: '#00A19D',
          paddingBottom: 10,
          borderBottomRightRadius: 5,
          borderBottomLeftRadius: 5,
        }}>
        <TouchableOpacity>
          <Button
            title="Subir Informe de Rendimiento Académico"
            color="#00A19D"
            onPress={(value) => pickDocument('informeAcademico')}
            value="Informe de Rendimiento Academico"
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: '#6F69AC',
          padding: 10,
          marginTop: 5,
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
        }}>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={selectFile}>
          <Text
            style={{
              alignSelf: 'center',
              color: '#ffff',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Seleccione el archivo
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: '#6F69AC',
          paddingBottom: 10,
          borderBottomRightRadius: 5,
          borderBottomLeftRadius: 5,
        }}>
        <TouchableOpacity>
          <Button
            title="Subir Informe de Notas"
            color="#6F69AC"
            onPress={(value) => pickDocument('informeNotas')}
            value="Informe de Notas"
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: '#C37B89',
          padding: 10,
          marginTop: 5,
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
        }}>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={selectFile}>
          <Text
            style={{
              alignSelf: 'center',
              color: '#ffff',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Seleccione el archivo
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: '#C37B89',
          paddingBottom: 10,
          borderBottomRightRadius: 5,
          borderBottomLeftRadius: 5,
        }}>
        <TouchableOpacity>
          <Button
            title="Subir Carta de Tercio Superior"
            color="#C37B89"
            onPress={(value) => pickDocument('cartaSuperior')}
            value="Carta de Tercio Superior"
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: '#2196F3',
          padding: 10,
          marginTop: 5,
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
        }}>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={selectFile}>
          <Text
            style={{
              alignSelf: 'center',
              color: '#ffff',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Seleccione el archivo
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: '#2196F3',
          paddingBottom: 10,
          borderBottomRightRadius: 5,
          borderBottomLeftRadius: 5,
        }}>
        <TouchableOpacity>
          <Button
            title="Subir Hoja de Inscripción de Siguiente Ciclo"
            color="#2196F3"
            onPress={(value) => pickDocument('hojaCicloProximo')}
            value="Hoja de Inscripcion de Siguiente Ciclo"
          />
        </TouchableOpacity>
      </View>
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
    borderColor: '#9D9D9D',
    padding: 10,
    marginVertical: 5,
    borderRadius: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonTextStyle: {
    color: 'White',
    alignItems: 'center',
  },
});
