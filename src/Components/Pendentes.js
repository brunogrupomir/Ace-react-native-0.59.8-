import React from 'react';
import { Text, View, StyleSheet, } from 'react-native';
import Style from './StylesPattern'
import ButtonFinalizarEntrega from '../Components/ButtonFinalizarEntrega'

const Entregas = props => {
    return (

        <View style={styles.container}>
            <View style={styles.containerBody}>
                <Text style={styles.Subtitle}>Código de Barras: {props.chavenfe}</Text>
                <Text style={styles.Subtitle}>Data: {props.date}</Text>
                <Text style={styles.Subtitle}>Nota Fiscal: {props.notafiscal}</Text>
                <Text style={styles.Subtitle}>Serie: {props.serie}</Text>
                <Text style={styles.Subtitle}>Status NF: {props.statusnfe}</Text>
            </View>
            <View style={styles.containerBtn}>
                <ButtonFinalizarEntrega nome='Finalizar com Canhoto' action={() => props.canhoto(props.id)} />
                <ButtonFinalizarEntrega nome='Finalizar sem canhoto' action={() => props.semCanhoto(props.id)} />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 250,
        borderRadius: 10,
        backgroundColor: Style.cor.verdeClaro,
        justifyContent: 'center',
        marginBottom: 10,

    },
    title: {
        fontSize: Style.size.medio,
        color: Style.cor.branco,
        fontFamily: Style.font.helvetica
    },
    Subtitle: {
        fontSize: Style.size.pequeno,
        color: Style.cor.branco,
        fontFamily: Style.font.helvetica
    },
    containerBody: {
        justifyContent: 'flex-start',
        margin: 10
    },
    containerBtn: {
        alignItems: 'center'
    }
})
export default Entregas;
