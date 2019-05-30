import React, { Component } from 'react';
import { StyleSheet, ImageBackground, View, Text, Alert } from 'react-native';
import HomeImage from '../assets/img/bg-home.png'
import BtnAdd from '../Components/ButtonAdd'
import TextInput from '../Components/TextIpunt'
import Styles from '../Components/StylesPattern'
import axios from 'axios'
import { connect } from 'react-redux'
import { onPlacaCpf } from '../store/actions/placaCpf'
import GeraToken from '../GeraToken'

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cpf: null,
            placa: null
        }
    }

    GeraToken = async () => {



        if (!this.state.placa) {
            return Alert.alert('Informe a placa')
        }

        if (!this.state.cpf) {
            return Alert.alert('Informe a o cpf')
        }

        const data = await GeraToken()
        if (data) {
            this.props.onPlacaCpf({ ...this.state })
            this.props.navigation.navigate('Home')
            console.log(true)
        } else {
            console.log(false)
        }
    }


    render() {
        return (
            <ImageBackground source={HomeImage} style={{ flex: 1, resizeMode: 'stretch' }}>
                <View style={styles.containerBar}>
                    <Text style={styles.title}>ACE</Text>
                    <Text style={styles.subTitle}>Aplicativo de Canhoto Eletronico</Text>
                </View>
                <View style={styles.container}>
                    <TextInput
                        icon='truck'
                        placeholder='Placa'
                        value={this.state.placa}
                        maxLength={7}
                        editable={true} style={{ marginBottom: 5 }}
                        onChangeText={placa => this.setState({ placa })} />

                    <TextInput
                        icon='address-card'
                        placeholder='CPF'
                        keyboardType='number-pad'
                        value={this.state.cpf}
                        editable={true}
                        maxLength={11}
                        onChangeText={cpf => this.setState({ cpf })} />
                    <BtnAdd nome='Login' action={this.GeraToken} />
                </View>

            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50
    },
    containerBar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    title: {
        color: Styles.cor.branco,
        fontSize: Styles.size.grande,
    },
    subTitle: {
        color: Styles.cor.branco,
        fontSize: Styles.size.medio,


    }
});


const mapStateToProps = ({ placaCpf }) => {
    return {
        placa: placaCpf.placa,
        cpf: placaCpf.cpf
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPlacaCpf: placaCpf => dispatch(onPlacaCpf(placaCpf))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)