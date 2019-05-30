import React from 'react';
import { View, Text, ImageBackground, StyleSheet, ScrollView } from 'react-native';
import HomeImage from '../assets/img/bg-home.png'
import Styles from './StylesPattern'
import BtnSair from '../Components/ButtonSair'
import moment from 'moment'
import 'moment/locale/pt-br'
import { connect } from 'react-redux'


// import { Container } from './styles';
const ComponentHome = props => {

    return (
        <ImageBackground source={HomeImage} style={{ flex: 1, resizeMode: 'stretch' }}>
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <Text style={styles.data}>{moment().locale('pt-br').format('ddd, D [de] MMMM [de] YYYY')}</Text>
                    <Text style={styles.dados}>Placa - {props.placa}</Text>
                    <Text style={styles.dados}>CPF - {props.cpf}</Text>
                    <BtnSair nome='Voltar' action={props.onVoltar} />
                </View>
                <View style={styles.containerBody} >
                    {props.lista}
                </View>
            </View>
        </ImageBackground>
    )
};

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
        marginLeft: 35,
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
        cpf: placaCpf.cpf
    }
}


export default connect(mapStateToProps, null)(ComponentHome)

