import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Button, Linking } from 'react-native';
import BtnSair from './ButtonSair'



export default class componentName extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }



    Voltar = () => {
        this.props.navigation.navigate('App')
    }


    render() {

        const lat = this.props.navigation.getParam('long')
        const long = this.props.navigation.getParam('lat')

        return (
            <View style={styles.container}>
                <Image source={this.props.navigation.getParam('image')} style={styles.image} />
                <View style={styles.btn}>
                    <Button
                        onPress={() => { Linking.openURL('https://maps.google.com/maps?q=loc:' + long + ',' + lat + '&z=11') }}
                        title="Localização"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
                <View style={{ margin: 10 }}>
                    <BtnSair nome='Voltar' action={this.Voltar} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#FFF',
        alignItems: 'center',

    },
    image: {
        resizeMode: 'stretch',
        width: '90%',
        height: 200,
        margin: 20,
    },
    btn: {
        width: 200,
        height: 20,
        marginTop: 10,
        borderRadius: 20,
    }

});
