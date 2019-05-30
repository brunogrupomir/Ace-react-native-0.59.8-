import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, } from 'react-native';
import Style from './StylesPattern'
import ButtonFinalizarEntrega from './ButtonFinalizarEntrega'

const FinalizadaCanhoto = props => {
    return (

        <TouchableOpacity onPress={() => props.onDetalhes(props.item)}>
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>{props.obs}</Text>
                </View>
                <View style={styles.containerBody}>
                    <Text style={styles.Subtitle}>Estabelecimento: {props.estab}</Text>
                    <Text style={styles.Subtitle}>Nota: {props.notafiscal}</Text>
                </View>
                <View style={styles.containerBtn}>
                    <ButtonFinalizarEntrega nome='Voltar Pendente' action={() => props.canhoto(props.item)} />
                </View>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 100,
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
    containerTitle: {
        justifyContent: 'center',
        flexDirection: 'row',

    },
    containerBody: {
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    containerBtn: {
        alignItems: 'center'
    }
})
export default FinalizadaCanhoto;
