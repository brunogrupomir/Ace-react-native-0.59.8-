import React, { Component } from 'react';
import { StyleSheet, ImageBackground, View, AsyncStorage, Alert } from 'react-native';
import HomeImage from '../assets/img/bg-home.png'
import BtnAdd from '../Components/ButtonAdd'
import TextInput from '../Components/TextIpunt'
import moment from 'moment'
import 'moment/locale/pt-br'
import axios from 'axios'





const initialState = {
    nome: null,
    rg: null,
    telefone: null,
    entrega: null

}
export default class AdicionarSemCanhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entrega: null,
            nome: null,
            rg: null,
            telefone: null,
            lat: null,
            long: null

        }
    }

    stateInitial = () => {
        this.setState({ ...initialstate })
    }

    Cancelar = () => {
        this.stateInitial()
        this.props.navigation.navigate('Home')
    }

    componentDidMount = async () => {
        const data = await this.props.navigation.getParam('item')
        const id = await data.id
        const item = await AsyncStorage.getItem(`${id}`)
        const entrega = JSON.parse(item)
        await this.setState({ entrega })
    }

    stateInitial = () => this.setState({ ...initialState })


    finalizarSemCanhoto = async () => {

        if (!this.state.nome) {
            return Alert.alert('Informe quem recebeu a entrega')
        }

        if (!this.state.telefone) {
            return Alert.alert('Informe Telefone')
        }

        if (!this.state.rg) {
            return Alert.alert('Informe o RG')
        }

        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude)
            console.log(position.coords.longitude)
            this.setState({
                lat: position.coords.latitude,
                long: position.coords.longitude
            })
        }, (error) => {
            console.log(error)
        })


        const res = await axios.post('http://200.150.166.73:5008/EnviaFoto', {
            obs: this.state.nome,
            date: moment().format('YYYY[-]MM[-]D'),
            cpf: '123456789-01',
            placa: 'Mir-0055',
            chave: this.state.entrega.chavenfe
        })
        // 
        console.log(res.data)
        const status = res.data.ttretorno[0].observacao
        const statusTrue = "ACE - Registro concluido com sucesso"

        if (status == statusTrue) {
            this.updateItem()
        } else {
            return Alert.alert('Erro no request')
        }
        console.log(true)

    }

    updateItem = async () => {
        console.log('upadteitem')
        const itemUpdate = {
            ...this.state.entrega,
            lat: this.state.lat,
            long: this.state.long,
            image: null,
            nome: this.state.nome,
            rg: this.state.rg,
            telefone: this.state.telefone,
            obs: this.state.obs,
            canhoto: false,
            finalizada: true,
            date: moment().format('YYYY[-]MM[-]D')

        }

        try {
            const id = this.state.entrega.id
            await AsyncStorage.mergeItem(`${id}`, JSON.stringify(itemUpdate))
            Alert.alert('Entrega Finalizada com Sucesso.')
            this.stateInitial()
            this.props.navigation.navigate('Home')
        } catch (err) {
            Alert.alert('Erro ao Finalizar Entrega.')
            this.stateInitial()
            this.props.navigation.navigate('Home')
            console.log(err)
        }
    }


    render() {
        return (
            <ImageBackground source={HomeImage} style={{ flex: 1, resizeMode: 'stretch' }}>
                <View style={styles.container}>

                    <View style={{ marginTop: 5 }}>
                        <TextInput
                            icon='user'
                            placeholder='Nome'
                            value={this.state.nome}
                            onChangeText={nome => this.setState({ nome })}
                        />
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <TextInput
                            icon='phone'
                            placeholder='Telefone'
                            value={this.state.telefone}
                            keyboardType='number-pad'
                            onChangeText={telefone => this.setState({ telefone })}
                        />
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <TextInput
                            icon='address-card'
                            placeholder='RG'
                            value={this.state.rg}
                            keyboardType='number-pad'
                            onChangeText={rg => this.setState({ rg })}
                        />
                    </View>



                    <BtnAdd nome='Confirmar' action={this.finalizarSemCanhoto} />
                    <BtnAdd nome='Cancelar' action={this.Cancelar} />
                </View>
            </ImageBackground>
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
