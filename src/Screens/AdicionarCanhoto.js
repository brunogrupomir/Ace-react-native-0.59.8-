import React, { Component } from 'react';
import { StyleSheet, ImageBackground, View, Image, AsyncStorage, Alert, TouchableOpacity, Text } from 'react-native';
import HomeImage from '../assets/img/bg-home.png'
import BtnAdd from '../Components/ButtonAdd'
import ImagePicker from 'react-native-image-picker';
import TextInput from '../Components/TextIpunt'
import moment from 'moment'
import 'moment/locale/pt-br'
import axios from 'axios'






const initialState = {
    image: null,
    lat: null,
    long: null,
    obs: null,
    entrega: null,

}

export default class AdicionarCanhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            lat: null,
            long: null,
            obs: null,
            entrega: null,
        }
    }

    componentDidMount = async () => {
        const data = await this.props.navigation.getParam('item')
        const id = await data.id
        const item = await AsyncStorage.getItem(`${id}`)
        const entrega = JSON.parse(item)
        await this.setState({ entrega })
    }

    stateInitial = () => this.setState({ ...initialState })


    finalizarCanhoto = async () => {

        if (!this.state.obs) {
            return Alert.alert('Informe quem recebeu a entrega')
        }

        if (!this.state.lat && !this.state.long) {
            this.stateInitial()
            this.props.navigation.navigate('Home')
            return Alert.alert('Error Lat e Long')
        }


        const res = await axios.post('http://200.150.166.73:5008/EnviaFoto', {
            foto: this.state.image.base64,
            lat: this.state.lat,
            long: this.state.long,
            obs: this.state.obs,
            date: moment().format('YYYY[-]MM[-]D'),
            cpf: '123456789-01',
            placa: 'Mir-0055',
            chave: this.state.entrega.chavenfe
        })

        console.log(res.data)
        const status = res.data.ttretorno[0].observacao
        const statusTrue = "ACE - Registro concluido com sucesso"

        if (status == statusTrue) {
            this.updateItem()
        } else {
            Alert.alert('Erro no request')

        }
        console.log(true)


    }

    updateItem = async () => {
        console.log('upadteitem')
        const itemUpdate = {
            ...this.state.entrega,
            image: this.state.image,
            lat: this.state.lat,
            long: this.state.long,
            obs: this.state.obs,
            canhoto: true,
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

    pickerImage = async () => {
        ImagePicker.showImagePicker({
            title: 'Escolha a imagem',
            quality: 0.3,
            mediaType: "photo",
            cameraType: "back",
            allowsEditing: true,
            maxWidth: 1000,
            maxHeight: 1000,
        }, res => {
            this.setState({ image: { uri: res.uri, base64: res.data } })
            this.setState({ lat: res.latitude })
            this.setState({ long: res.longitude })
            console.log(res)
        })
    }

    render() {
        return (
            <ImageBackground source={HomeImage} style={{ flex: 1, resizeMode: 'stretch' }}>

                <View style={styles.container}>
                    {this.state.image ?
                        <View style={styles.containerImg}>
                            <Image source={this.state.image} style={styles.image} />
                            <TextInput
                                icon='address-card'
                                placeholder='Quem recebeu a entrega ?'
                                value={this.state.obs}
                                onChangeText={texto => this.setState({ obs: texto })}
                                autoFocus={true} />
                        </View>
                        : null}
                    <View style={styles.containerButton}>
                        {!this.state.image ?
                            <BtnAdd nome='Adicionar Canhoto' action={this.pickerImage} /> :
                            <BtnAdd nome='Continuar' action={this.finalizarCanhoto} />}
                        <BtnAdd nome='Cancelar' action={() => this.props.navigation.navigate('Home')} />
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
    containerImg: {
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    containerButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '90%',
        height: '70%',
        resizeMode: 'stretch'
    },
});
