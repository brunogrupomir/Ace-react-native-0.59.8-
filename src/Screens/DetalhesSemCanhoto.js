import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Linking, ImageBackground, TouchableOpacity } from 'react-native';
import BtnSair from '../Components/ButtonSair'
import HomeImage from '../assets/img/bg-home.png'
import Styles from '../Components/StylesPattern'
import Icon from 'react-native-vector-icons/FontAwesome5'


export default class componentName extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }



    Voltar = () => {
        this.props.navigation.navigate('SemCanhoto')
    }

    render() {

        const long = this.props.navigation.getParam('long')
        const lat = this.props.navigation.getParam('lat')

        return (
            <ImageBackground source={HomeImage} style={{ flex: 1, resizeMode: 'stretch' }}>
                <View style={styles.container}>
                    <View style={styles.containerDetalhes}>
                        <Text style={styles.title}>Chave: <Text style={styles.subTitle}>{this.props.navigation.getParam('chavenfe')}</Text></Text>
                        <Text style={styles.title}>Data: <Text style={styles.subTitle}>{this.props.navigation.getParam('date')}</Text></Text>
                        <Text style={styles.title}>Estabelecimento: <Text style={styles.subTitle}>{this.props.navigation.getParam('estab')}</Text></Text>
                        <Text style={styles.title}>Nota Fiscal: <Text style={styles.subTitle}>{this.props.navigation.getParam('notafiscal')}</Text></Text>
                        <Text style={styles.title}>Status NFE: <Text style={styles.subTitle}>{this.props.navigation.getParam('statusnfe')}</Text></Text>
                        <Text style={styles.title}>Serie: <Text style={styles.subTitle}>{this.props.navigation.getParam('serie')}</Text></Text>
                        <Text style={styles.title}>Destinatario: <Text style={styles.subTitle}>{this.props.navigation.getParam('nome')}</Text></Text>
                        <Text style={styles.title}>Contato: <Text style={styles.subTitle}>{this.props.navigation.getParam('telefone')}</Text></Text>
                        <Text style={styles.title}>RG: <Text style={styles.subTitle}>{this.props.navigation.getParam('rg')}</Text></Text>
                        <Text style={styles.title}>Status: <Text style={styles.subTitle}>{'Fianalizada Sem Canhoto'}</Text></Text>
                    </View>
                    <View style={styles.btn}>
                        <TouchableOpacity onPress={() => { Linking.openURL('https://maps.google.com/maps?q=loc:' + lat + ',' + long + '&z=11') }}>
                            <Icon name='map-marker-alt' size={30} style={styles.icon} />
                            <Text style={styles.subTitle}>Localização</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerBtnSair}>
                        <TouchableOpacity onPress={this.Voltar}>
                            <Icon name='long-arrow-alt-left' size={40} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,


    },
    btn: {
        width: 200,
        height: 20,
        marginTop: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'flex-start',
        margin: 10,

    },
    containerDetalhes: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    containerBtnSair: {
        margin: 10,
        alignItems: 'flex-end',
        marginTop: 250
    },
    title: {
        color: Styles.cor.branco,
        fontSize: Styles.size.medio,
        marginTop: 1
    },
    subTitle: {
        color: Styles.cor.branco,
        fontSize: Styles.size.pequeno,
        marginTop: 1

    },
    icon: {
        color: '#B22222',
        marginLeft: 10
    },
});
