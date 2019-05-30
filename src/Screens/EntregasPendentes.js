import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, AsyncStorage, FlatList } from 'react-native';
import HomeImage from '../assets/img/bg-home.png'
import Styles from '../Components/StylesPattern'
import BtnSair from '../Components/ButtonSair'
import Entregas from '../Components/Pendentes'
import moment from 'moment'
import 'moment/locale/pt-br'
import { connect } from 'react-redux'



class EntregasPendentes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entregas: []
        };
    }

    Canhoto = (item) => {
        this.props.navigation.navigate('Addcanhoto', { item })
    }

    semCanhoto = (item) => {
        this.props.navigation.navigate('AddSemCanhoto', { item })
    }

    componentDidMount = async () => {
        await this.getEntregas()
        console.log(this.state.entregas)
    }

    getEntregas = async () => {
        // const entregasArray = [...this.state.entregas]
        const entregas = []
        await AsyncStorage.getAllKeys((error, keys) => {
            return AsyncStorage.multiGet(keys, (error, result) => {
                result.forEach(([key, val]) => {
                    entregas.push(JSON.parse(val));
                    console.log('Entregas', entregas)
                    this.setState({ entregas })
                })
            })
        });
    }

    render() {
        const { entregas } = this.state;
        const Filter = entregas.filter(e => !e.finalizada && e.placa == this.props.placa && e.cpf == this.props.cpf)
        return (
            <ImageBackground source={HomeImage} style={{ flex: 1, resizeMode: 'stretch' }}>
                <View style={styles.container}>
                    <View style={styles.containerHeader}>
                        <Text style={styles.data}>{moment().locale('pt-br').format('ddd, D [de] MMMM [de] YYYY')}</Text>
                        <Text style={styles.dados}>Placa - {this.props.placa}</Text>
                        <Text style={styles.dados}>CPF - {this.props.cpf}</Text>
                        <BtnSair nome='Voltar' action={() => this.props.navigation.navigate('Home')} />
                    </View>

                    <View style={styles.containerBody} >
                        <FlatList data={Filter}
                            keyExtractor={item => `${item.id}`}
                            renderItem={({ item }) =>
                                <Entregas {...item} canhoto={this.Canhoto} semCanhoto={this.semCanhoto} id={item} />
                            } />

                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        marginTop: 10,
        marginLeft: 10
    },
    containerHeader: {
        justifyContent: 'flex-start'
    },
    containerBody: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    containerBar: {

    },
    dados: {
        fontSize: Styles.size.pequeno,
        fontFamily: Styles.font.helvetica,
        color: Styles.cor.branco
    },
    data: {
        fontSize: Styles.size.medio,
        fontFamily: Styles.font.helvetica,
        color: Styles.cor.branco,
        fontWeight: 'bold',
    },
    containerData: {
        marginLeft: 10
    }
});

const mapStateToProps = ({ placaCpf }) => {
    return {
        placa: placaCpf.placa,
        cpf: placaCpf.cpf,
    }
}

export default connect(mapStateToProps, null)(EntregasPendentes)