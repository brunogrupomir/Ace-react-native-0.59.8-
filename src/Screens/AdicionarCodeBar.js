import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Modal, Alert, Text, AsyncStorage } from 'react-native';
import { RNCamera } from 'react-native-camera';
import HomeImage from '../assets/img/bg-home.png'
import BtnAdd from '../Components/ButtonAdd'
import { connect } from 'react-redux'
import { getCodeBar } from '../store/actions/getCodeBar'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/pt-br'
import Styles from '../Components/StylesPattern'





const initialState = {
    entregas: [],
    camera: false,
    codeBar: null,
    modalVisible: false,
    estab: null,
    notafiscal: null,
    serie: null,
    statusnfe: null,
    data: null
}

class AdicionarCodeBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entregas: [],
            camera: false,
            codeBar: null,
            modalVisible: false,
            estab: null,
            notafiscal: null,
            serie: null,
            statusnfe: null,
            data: null

        }
    }

    componentDidMount() {
        this.getEntregas()
    }


    toogleCamera = () => this.setState({ camera: !this.state.camera })
    initialState = () => this.setState({ ...initialState })
    Cancelar = async () => {
        await this.setState({ ...initialState })
        this.props.navigation.navigate('Home')
    }

    ValidaCodeBar = async () => {
        const res = await axios.post('http://200.150.166.73:5008/EnviaFoto', {
            chave: this.state.codeBar,
        })

        console.log(res)
        const status = res.data.ttretorno[0].observacao
        const statusTrue = "ACE - Registro concluido com sucesso"

        if (status == statusTrue) {
            this.setState({ ...res.data.ttretorno[0] })
            this.setState({ data: moment().format('YYYY[-]MM[-]D') })

            const entregas = [...this.state.entregas]
            entregas.unshift({
                id: Math.random(),
                date: moment().format('YYYY[-]MM[-]D'),
                finalizada: false,
                placa: this.props.placa,
                cpf: this.props.cpf,
                ...res.data.ttretorno[0]
            })
            this.setState({ entregas })

            this.setState({ modalVisible: true })

        } else {
            Alert.alert('status')
        }


    }

    getEntregas = async () => {
        const entregas = []
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                stores.map(async (result, i, store) => {
                    // get at each store's key/value so you can work with it
                    let value = store[i][1];
                    let data = JSON.parse(value)

                    entregas.unshift({
                        ...data
                    })

                });
            });
        });

        await this.setState({ entregas })
        console.log(this.state.entregas)

    }

    storageEntrega = async () => {
        try {
            const entregas = [...this.state.entregas]
            entregas.map(async (item, index) => {
                item.id = 'entregas' + index
                await AsyncStorage.setItem('entregas' + index, JSON.stringify(item))
            })
            this.Cancelar()

        } catch (err) {
            Alert.alert('Erro')
            this.Cancelar()
        }


    }

    render() {
        return (


            <ImageBackground source={HomeImage} style={{ flex: 1, resizeMode: 'stretch' }}>
                {!this.state.modalVisible ?
                    <View style={styles.container}>
                        {this.state.camera ? <View style={styles.containerCamera}>
                            <RNCamera
                                ref={ref => {
                                    this.camera = ref;
                                }}
                                style={styles.preview}
                                type={RNCamera.Constants.Type.back}
                                flashMode={RNCamera.Constants.FlashMode.on}
                                onGoogleVisionBarcodesDetected={async ({ barcodes }) => {
                                    const res = await barcodes[0].data
                                    if (res.length == 44) {
                                        this.setState({ codeBar: res, camera: false })
                                        this.props.onGetCodeBar({ codeBar: this.state.codeBar })
                                        this.ValidaCodeBar()
                                        console.log(res)
                                        return
                                    } else {
                                        Alert.alert('Quantidade de Digitos inválido')
                                        this.toogleCamera()
                                    }
                                }}
                            />
                            <View style={styles.ButtonCamera}>
                                <BtnAdd nome='Cancelar' action={this.toogleCamera} />
                            </View>
                        </View> : null}
                        {!this.state.camera ?
                            <View style={styles.containerButton}>
                                <BtnAdd nome='Adicionar Código de Barras' action={this.toogleCamera} />
                                <BtnAdd nome='Cancelar' action={this.Cancelar} />
                            </View> : null}
                    </View> : null}


                {this.state.modalVisible ? <View style={styles.containerModal}>
                    <Modal
                        animationType="none"
                        transparent={true}
                        visible={this.state.modalVisible}>
                        <View style={styles.containerText}>
                            <Text style={styles.title}>Código de Barras: {this.state.codeBar}</Text>
                            <Text style={styles.title}>Estabelecimento: {this.state.estab}</Text>
                            <Text style={styles.title}>Nota Fiscal: {this.state.notafiscal}</Text>
                            <Text style={styles.title}>Serie: {this.state.serie}</Text>
                            <Text style={styles.title}>Status da NF: {this.state.statusnfe}</Text>
                            <Text style={styles.title}>Data: {this.state.data}</Text>
                        </View>
                        <View style={styles.containerBTN}>
                            <BtnAdd nome='Confirmar' action={this.storageEntrega} />
                            <BtnAdd nome='Cancelar' action={this.initialState} />
                        </View>

                    </Modal>
                </View> : null}

            </ImageBackground>


        );
    }

}

const styles = StyleSheet.create({
    containerCamera: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    container: {
        flex: 1
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    containerButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    ButtonCamera: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 20,
    },
    containerModal: {
        width: '90%',
    },
    title: {
        color: Styles.cor.branco,
        fontSize: Styles.size.medio,
        fontFamily: Styles.font.helvetica,
    },
    containerBTN: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60
    },
    containerText: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        margin: 10
    }
});

const mapStateToProps = ({ placaCpf }) => {
    return {
        placa: placaCpf.placa,
        cpf: placaCpf.cpf,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onGetCodeBar: codeBar => dispatch(getCodeBar(codeBar))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdicionarCodeBar)