import React, { Component } from 'react';
import { StyleSheet, ImageBackground, View, Alert, Button, Text } from 'react-native';
import db from 'react-native-firebase'



export default class ValidaToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cnpj: '',
      token: null
    }
  }


  ValidaCNPJ = async () => {
    db.firestore().collection('Clientes').doc('01709579000129')
      .get().then((doc) => {
        console.log(doc.data())
      })
      .catch(function (error) {
        Alert.alert('Erro de conexão' + error)
        console.log(error)
      });
  }

  render() {
    return (
      <View>
        <Text>Teste</Text>
        <Button
          onPress={this.ValidaCNPJ}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

