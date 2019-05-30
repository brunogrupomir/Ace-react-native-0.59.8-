import React from 'react';
import Styles from './StylesPattern'

import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

// import { Container } from './styles';

const ButtonFinalizarEntrega = props => {
    return (
        <View>
            <TouchableOpacity onPress={props.action}>
                <View style={styles.container}>
                    <Text style={styles.title}>{props.nome}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonFinalizarEntrega;

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Styles.cor.branco,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    title: {
        fontSize: Styles.size.peqeuna,
        fontFamily: Styles.font.helvetica,
        color: Styles.cor.azul
    }
})