import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PDFReader from 'rn-pdf-reader-js';
import Constants from 'expo-constants';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <PDFReader
          source={{
            uri: 'https://www.udb.edu.sv/udb_files/content_resource/es/pensum/pensum-ingenieria-en-ciencias-de-la-computacion-plan-2017.pdf',
          }}
          webviewProps={{
            startInLoadingState: true,
          }}
          style={{ height: 500, width: '100%' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
  },
});
