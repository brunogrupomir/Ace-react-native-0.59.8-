import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import HomeImage from '../assets/img/bg-home.png'
import ButtonHomeMenu from '../Components/ButtonHomeMenu'
import Styles from '../Components/StylesPattern'
import BtnSair from '../Components/ButtonSair'
import moment from 'moment'
import 'moment/locale/pt-br'
import { connect } from 'react-redux'
import GeraToken from '../GeraToken'



// import { Container } from './styles';

class ComponentHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    Logout = () => this.props.navigation.navigate('ValidaToken')

    Novo = async () => {
        const data = await GeraToken()
        if (data) {
            this.props.navigation.navigate('Novo')
            console.log(true)
        } else {
            console.log(false)
            alert.alert('erro iris/Token')
        }
    }

    Pendentes = async () => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
        })

        const data = await GeraToken()
        if (data) {
            this.props.navigation.navigate('Pendentes')
            console.log(true)
        } else {
            console.log(false)
            alert.alert('erro iris/Token')
        }
    }

    Canhoto = async () => {

        const data = await GeraToken()
        if (data) {
            this.props.navigation.navigate('Canhoto')
            console.log(true)
        } else {
            console.log(false)
            alert.alert('erro iris/Token')
        }
    }

    SemCanhoto = async () => {
        const data = await GeraToken()
        if (data) {
            this.props.navigation.navigate('SemCanhoto')
            console.log(true)
        } else {
            console.log(false)
            alert.alert('erro iris/Token')
        }
    }



    render() {
        return (
            <ImageBackground source={HomeImage} style={{ flex: 1, resizeMode: 'stretch' }}>
                <View style={styles.container}>
                    <View style={styles.containerHeader}>
                        <Text style={styles.data}>{moment().locale('pt-br').format('ddd, D [de] MMMM [de] YYYY')}</Text>
                        <Text style={styles.dados}>Placa - {this.props.placa}</Text>
                        <Text style={styles.dados}>CPF - {this.props.cpf}</Text>
                        <BtnSair nome='Logout' action={this.Logout} />
                    </View>
                    <View style={styles.containerBody} >
                        <ButtonHomeMenu title='Carregar' icon='truck' onPage={this.Novo} />
                        <ButtonHomeMenu title='Pendentes' icon='map-marked-alt' onPage={this.Pendentes} />
                        <ButtonHomeMenu title='Com Canhoto' icon='paste' onPage={this.Canhoto} />
                        <ButtonHomeMenu title='Sem Canhoto' icon='folder-open' onPage={this.SemCanhoto} />
                    </View>
                </View>
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around'
    },
    containerHeader: {
        paddingHorizontal: 10,
        justifyContent: 'flex-start'
    },
    containerBody: {
        // marginBottom: 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
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
        cpf: placaCpf.cpf
    }
}


export default connect(mapStateToProps, null)(ComponentHome)